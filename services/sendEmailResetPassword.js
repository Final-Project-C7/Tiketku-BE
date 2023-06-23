// services/sendEmail.js

const nodemailer = require("nodemailer");

// Function to send OTP via email
async function sendEmailResetPassword(email, link) {
  // Create a transporter using SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Replace with your SMTP host
    port: 587, // Replace with your SMTP port
    secure: false, // Set to true if using a secure connection (TLS/SSL)
    auth: {
      user: "ferdy.lz2000@gmail.com", // Replace with your email address
      pass: "dbnovvoivojmmkip", // Replace with your email password
    },
  });

  // Define email options
  const mailOptions = {
    from: "ferdy.lz2000@gmail.com", // Replace with your email address
    to: email, // Recipient's email address
    subject: "Reset Password", // Email subject
    text: `Ikuti link berikut untuk melakukan reset password : ${link}`, // Email body
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

module.exports = sendEmailResetPassword;
