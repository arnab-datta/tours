const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a Transporter
  const transpoter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Activate in gmail "less secure app" option
  });

  // Define the email options
  const mailOptions = {
    from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_MAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html
  };

  // Actually send the email
  await transpoter.sendMail(mailOptions);
};

module.exports = sendEmail;
