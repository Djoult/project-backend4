// import schedule from 'node-schedule';
// import mail from 'nodemailer';
// import 'dotenv/config';
// import Subscription from '../models/subscription.js';

// export const mailer = async function (title, obj) {	
//     try {
//         let emailContent = 'This is the text content of your email'; 
//         let transporter = mail.createTransport({
//             host: process.env.BASE_URL,
//             port: process.env.PORT,
//             maxMessages: Infinity,
//             debug: true,
//             secure: true,
//             auth:{
//                 user: process.env.UKR_NET_EMAIL,
//                 pass: process.env.UKRNET_PASSWORD
//             },
//             tls: {
//                 rejectUnauthorized: false
//             }
//         });

//        let allSubs = await Subscription.find();

//         if (allSubs.length === 0) {
//             // Відправляємо відповідь, яка позначає відсутність підписок
//             return res.status(404).json({ message: 'No subscriptions found in the database' });
//         }

//         allSubs.forEach(async function (item) {
//             if (typeof item.email !== "undefined") {
//                 transporter.sendMail({
//                     from: `${process.env.UKR_NET_EMAIL} <${process.env.UKR_NET_EMAIL}>`,
//                     to: item.email,
//                     subject: title,
//                     replyTo: process.env.UKR_NET_EMAIL,
//                     // headers: { 'Mime-Version': '1.0', 'X-Priority': '3', 'Content-type': 'text/html; charset=iso-8859-1' },
//                      text: emailContent
//                 }, (err, info) => {
//                     if (err !== null) {
//                         console.log(err);
//                     }
//                     else {
//                         console.log(`Email sent to ${item.email} at ${new Date().toISOString()}`);
//                     }
//                 });
//             }
//         });

//     } catch (e) {
//         console.log(e);
//     }
// }


// // Run the CronJob
// schedule.scheduleJob('00 30 10 * * 1', async function() {
//     try {
//         mailer(`This is our Subscription Email`, {
//             'content' : "Hello, welcome from our Subscription email 👋"
//         });
//     } catch(e) {
//         console.log(e);
//     }
// });
import schedule from 'node-schedule';
import 'dotenv/config';
import Subscription from '../models/subscription.js';
import sendEmail from './sendEmail.js'; // Імпортуйте функцію sendEmail з файлу sendEmail.js

export const mailer = async function (title, obj) {	
    try {
        // Отримуємо всі підписки з бази даних
        let allSubs = await Subscription.find();

        if (allSubs.length === 0) {
            // Відправляємо відповідь, яка позначає відсутність підписок
            return res.status(404).json({ message: 'No subscriptions found in the database' });
        }

        allSubs.forEach(async function (item) {
            if (typeof item.email !== "undefined") {
                const userEmail = item.email;
            
                const emailContent = 'You have successfully subscribed!';
                const emailSubject = 'Subscription Confirmation';

                try {
                    await sendEmail({
                        to: userEmail,
                        subject: emailSubject,
                        text: emailContent,
                    });

                    console.log(`Email sent to ${userEmail} at ${new Date().toISOString()}`);
                } catch (error) {
                    console.error(`Error sending email to ${userEmail}: ${error}`);
                }
            }
        });

    } catch (e) {
        console.log(e);
    }
}

schedule.scheduleJob('00 30 10 * * 1', async function() {
    try {
        mailer(`This is our Subscription Email`, {
            'content' : "Hello, welcome from our Subscription email 👋"
        });
    } catch(e) {
        console.log(e);
    }
});

