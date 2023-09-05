import schedule from 'node-schedule';
import mail from 'nodemailer';
import 'dotenv/config';
import fs from 'fs/promises';
import { replaceHTML } from '../helpers/subscripionHelper.js';
import Subscription from '../models/subscription.js';
// import mongoose from 'mongoose';

// mongoose.createConnection(process.env.DB_HOST, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

export const mailer = async function (title, obj) {
  try {
    let email = await fs.readFile('./public/templates/index.html', {
      encoding: 'utf-8',
    });
    let text = replaceHTML(email, obj);
    let transporter = mail.createTransport({
      host: process.env.BASE_URL,
      port: process.env.PORT,
      maxMessages: Infinity,
      debug: true,
      secure: true,
      auth: {
        user: process.env.UKR_NET_EMAIL,
        pass: process.env.UKRNET_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let allSubs = await Subscription.find();

    allSubs.forEach(function (item) {
      if (typeof item.email !== 'undefined') {
        transporter.sendMail(
          {
            from: `${process.env.UKR_NET_EMAIL} <${process.env.UKR_NET_EMAIL}>`,
            to: item.email,
            subject: title,
            replyTo: process.env.UKR_NET_EMAIL,
            headers: {
              'Mime-Version': '1.0',
              'X-Priority': '3',
              'Content-type': 'text/html; charset=iso-8859-1',
            },
            html: text,
          },
          (err, info) => {
            if (err !== null) {
              console.log(err);
            } else {
              console.log(
                `Email sent to ${item.email} at ${new Date().toISOString()}`
              );
            }
          }
        );
      }
    });
  } catch (e) {
    console.log(e);
  }
};

// Run the CronJob
// schedule.scheduleJob('*/10 * * * * *', async function() {
//     try {
//         mailer(`This is our Subscription Email`, {
//             'content' : "Hello, welcome to our Subscription email 👋"
//         });
//     } catch(e) {
//         console.log(e);
//     }
// });
