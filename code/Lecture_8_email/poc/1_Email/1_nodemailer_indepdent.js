
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

// SMTP details
const sendGridSMTPDetails = {
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY
    }
}
// const gmailSMTPDetails = {
//     host: 'smtp.gmail.com',
//     port: "578",
//     auth: {
//         user: "apikey",
//         pass: process.env.SENDGRID_API_KEY
//     }
// }
// message details
const msg = {
    to: 'mr.jasbirsingh96@gmail.com', // Change to your recipient
    from: 'jasbir.singh@scaler.com', // Change to your verified sender
    subject: 'Sending with SendGrid ',
    text: 'Poc textual content',
    html: '<h1>Sendgrid Integration example</h1>',
}
// defined the email service provide 
const transporter = nodemailer
.createTransport(sendGridSMTPDetails);
transporter.sendMail(msg)
    .then(() => {
        console.log('Email sent')
    }).catch((error) => {
        console.log(error);

    });