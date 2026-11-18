import nodemailer from "nodemailer";
import { env } from "../configs/env";


// Create
// nodemailer.createTestAccount().then((email)=> console.log(email))

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false,
//   auth: { user: "pl77oe6nq65gg6pp@ethereal.email", pass: "mNX96vbpTRYdmp1nDu" },
// });

// // Send Mail
// transporter.sendMail({
//   from: 'pl77oe6nq65gg6pp@ethereal.email',
//   to: 'someone@tes.com',
//   subject: 'Hi there',
//   text: 'Hello there, this is a tes mail.',
//   html: '<p> <b> Hello, </b> this is a test mail. </p>'
// }, (error, success)=> success ? console.log('Success:', success) : console.log('Error:', error) )


export default function sendMeil(to: string, subject: string, message: string): void {
    //* GoogleMail (gmail)
    //* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
    //* Never write the password in the code, keep it in .env
    const transoprter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: env.MAIL_USER,
            pass: env.MAIL_PASS
        }
    });

    transoprter.sendMail({
        from: env.MAIL_USER,
        to,
        subject,
        text: message,
        html: message
    }, (error, success) => (success ? console.log('Success:', success) : console.log('Error:', error)))
}