const nodemailer = require("nodemailer");
const generateOTP = require("./otpGenerator");

const sendOTPByEmail = async (email, otp) => {
  try {
    // Konfigurasi transporter untuk pengiriman email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "ferdy.lz2000@gmail.com",
        pass: "asakurayoh",
      },
    });

    // Konfigurasi email yang akan dikirim
    const mailOptions = {
      from: "ferdy.lz2000@gmail.com",
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is: ${otp}`,
    };

    // Kirim email
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email", error);
  }
};

module.exports = sendOTPByEmail;
