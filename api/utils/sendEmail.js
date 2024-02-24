import nodemailer from 'nodemailer';

const verifyEmail = async (email, link) => {
    
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,   //gmail
            service: process.env.SERVICE,      //smtp.gmail.com
            port: Number(process.env.EMAIL_PORT),   //587
            secure: Boolean(process.env.SECURE),       //true
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        });

        await transporter.sendMail({
            from: '"GBE ESTATES" <process.env.USER>',
            to: email,
            subject: "Account Verification",
            text: "Welcome",
            html: `<div>
            <p>Hello 🙌, thank you for signing up to GBE Real Estates. Verify your email by clicking this link below👇👇 </p>
            <a href=${link}>Click here to activate your account.</a>
                </div>`
        });
        console.log("Email Sent Successfully!")
    } catch (error) {
        console.error(error);
    }
};

export default verifyEmail;