import nodemailer from 'nodemailer';
import 'dotenv/config';

const { UKRNET_PASSWORD } = process.env;

//додав свої параметри пошти
const nodemailerConfig = {
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
        user: "taras.papka@ukr.net",
        pass: UKRNET_PASSWORD,
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);
