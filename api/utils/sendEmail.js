import nodemailer from 'nodemailer';

const verifyEmail = async (email, link) => {
    try {
        const transporter = nodemailer.createTransport({
            // host: process.env.HOST,
            service: process.env.SERVICE,
            // port: Number(process.env.EMAIL_PORT),
            // secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: "Account Verification",
            text: "Welcome",
            html: `<div>
            <a href=${link}>Click here to activate your account.</a>
                </div>`
        });
        console.log("Email Sent Successfully!")
    } catch (error) {
        console.log("Email not sent");
        console.log(error)
    }
};

export default verifyEmail;