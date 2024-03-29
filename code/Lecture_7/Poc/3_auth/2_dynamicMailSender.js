
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
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
function updatetemplate(content, emailObject) {
    let keysArr = Object.keys(emailObject);
    keysArr.forEach((key) => {
        content = content.replace(`#{${key}}`, emailObject[key])
    })
    return content;
}
async function emailSender(template, recieverEmail, emailObject) {
    try {
        // get the template file and read the content
        const templatePath = path.join(__dirname, 'email_templates', template);
        const content = await fs.promises.readFile(templatePath, 'utf-8');
        const finalEmailContent = updatetemplate(content, emailObject);
        // replace the placeholders with the values from emailObject
        const msg = {
            to: recieverEmail, // Change to your recipient
            from: 'jasbir.singh@scaler.com', // Change to your verified sender
            subject: 'Sending with SendGrid ',
            text: 'Poc textual content',
            html: finalEmailContent,
        }
        // send the email to reciverEmail
        const transporter = nodemailer.createTransport(sendGridSMTPDetails);
        await transporter.sendMail(msg);
    } catch (err) {
        console.log("email failure error", err)
    }
}
module.exports = emailSender;

// emailSender("welcome.html", "mr.jasbirsingh96@gmail.com", { name: "Jasbir" }).then(() => {
//     console.log("Email sent successfully")
// }).catch((err) => {
//     console.log("Email sending failed", err)
// })



/***
 * // signup -> on signup i have to send an email
 * prepration
 *  * welcome email template-> what placeholder are required  
 * 
 * execution -> 
 * * take that template -> read -> string -> replace -> placeholder -> actual holder
 * 
 * **/ 