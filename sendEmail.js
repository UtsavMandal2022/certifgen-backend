const nodemailer = require('nodemailer');
require('dotenv').config();
const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        // service: "Gmail", // smtp - Simple Mail Transfer Protocol
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
        secure: false,
        // domains: ["gmail.com", "googlemail.com"],
        // connectionTimeout: 10000,
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM, // takes default from as EMAIL_USERNAME
        ...options
    };

    return await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            console.log(process.env.EMAIL_USERNAME);
        } else {
            console.log(info);
        }
    });
}

module.exports = sendEmail;