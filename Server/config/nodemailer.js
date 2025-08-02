import nodemailer from 'nodemailer';

let transporter = null;

const createTransporter = () => {
    if (!transporter) {
        console.log('=== CREATING SMTP TRANSPORTER ===');
        console.log('SMTP_USER:', process.env.SMTP_USER);
        console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***SET***' : '***NOT SET***');
        console.log('SENDER_EMAIL:', process.env.SENDER_EMAIL);
        console.log('==================================');

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
                console.log('❌ SMTP CONNECTION FAILED:', error.message);
                console.log('Error code:', error.code);
            } else {
                console.log('✅ SMTP Server is ready to send emails');
            }
        });
    }
    return transporter;
};

export default createTransporter;