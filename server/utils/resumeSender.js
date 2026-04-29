const nodemailer = require("nodemailer");

const resumeSender = async (email, title, body, attachments) => {
    try {
        // Remove spaces from password if present
        const mailPass = process.env.MAIL_PASS.replace(/\s/g, '');
        
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587, // Use 587 for TLS
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: mailPass,
            },
            tls: {
                rejectUnauthorized: false // For development only
            }
        });

        let mailOptions = {
            from: `"I Next ETS" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
            attachments: attachments || [], // Initialize attachments as an empty array if not provided
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Email with attachment sent successfully:', info.response);
        return info;
    } catch (error) {
        console.error('Error sending email with attachment:', error.message);
        return error.message;
    }
};

module.exports = resumeSender;
