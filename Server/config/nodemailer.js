import nodemailer from 'nodemailer';

let transporter = null;

const createTransporter = () => {
    if (!transporter) {

        transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: '587',
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Test the connection
        transporter.verify(function(error, success) {
            if (error) {
                console.log('Error code:', error.code);
            } else {
                console.log('✅ SMTP Server is ready to send emails');
            }
        });
    }
    return transporter;
};

export default createTransporter;