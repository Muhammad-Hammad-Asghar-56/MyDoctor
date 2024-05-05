var nodemailer = require('nodemailer');



const notifyUserLogin=(email)=>{
    console.log(process.env.Gmail_Password)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.Email,
            pass: process.env.Gmail_Password
        }
    });

    const mailOptions = {
        from: process.env.Email,
        to: email,
        subject: "Account Login Notification",
        html: `
            <p>Dear User,</p>
            <p>We hope this email finds you well.</p>
            <p>This is to inform you that your account was recently accessed. We wanted to reach out to confirm that this login activity was initiated by you.</p>
            <p>If you logged into your account recently, please disregard this message. However, if you did not authorize this login, we strongly advise you to take immediate action to secure your account.</p>
            <p>Here are some steps you can take:</p>
            <ul>
                <li>Change your password immediately to prevent unauthorized access.</li>
                <li>Review your account settings and security information for any suspicious changes.</li>
                <li>Enable two-factor authentication for an extra layer of security.</li>
            </ul>
            <p>If you notice any unauthorized activity or suspect your account has been compromised, please contact our support team immediately.</p>
            <p>Your account security is of utmost importance to us, and we take every measure to ensure the safety of your information. If you have any questions or concerns, please don't hesitate to reach out to us.</p>
            <p>Thank you for your attention to this matter.</p>
            <p>Best regards,<br>[Your Name]<br>[Your Position/Role]<br>[Your Company/Organization]</p>
        `
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


module.exports={notifyUserLogin}