const nodemailer = require("nodemailer");

// Function to send OTP via email
async function sendOTPByEmail(email, otp) {
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
    subject: "OTP Verification", // Email subject
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              padding: 20px;
            }
            .container {
              background-color: #ffffff;
              border-radius: 5px;
              padding: 20px;
            }
            h1 {
              color: #7126b5;
              margin-top: 0;
            }
            p {
              margin-bottom: 20px;
            }
            .otp {
              background-color: #7126b5;
              color: #ffffff;
              font-size: 24px;
              font-weight: bold;
              padding: 10px;
              border-radius: 5px;
              width: fit-content;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>OTP Verification</h1>
            <p>Use the following OTP to verify your account:</p>
            <div class="otp">${otp}</div>
          </div>
        </body>
      </html>
    `,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

module.exports = sendOTPByEmail;
