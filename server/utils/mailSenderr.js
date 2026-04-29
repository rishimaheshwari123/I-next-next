const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
    try {
        // Remove spaces from password if present
        const mailPass = process.env.MAIL_PASS ? process.env.MAIL_PASS.replace(/\s/g, '') : '';
        
        // Validate environment variables
        if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !mailPass) {
            throw new Error('Email configuration is missing. Please check MAIL_HOST, MAIL_USER, and MAIL_PASS in .env file');
        }
        
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: mailPass,
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        let info = await transporter.sendMail({
            from: `"I Next ETS" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        
        return info
    } catch (error) {
        console.error('Error sending email:', error.message)
        throw error;
    }
}

module.exports = mailSender
