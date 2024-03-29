// you need to install sengrid package
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
dotenv.config();
// used to identify my application
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// configuration required to send the email
const msg = {
    to: 'mr.jasbirsingh96@gmail.com', // Change to your recipient
    from: 'jasbir.singh@scaler.com', // Change to your verified sender
    subject: 'Sending with SendGrid ',
    text: 'Poc textual content',
    html: '<h1>Sendgrid Integration example</h1>',
}
// send the email
sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })