const expressAsyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const generateOTP = require("./otpGenerator");

let transporter;

(async () => {
  try {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "ferdy.lz2000@gmail.com",
        pass: "dbnovvoivojmmkip",
      },
    });
  } catch (error) {
    console.log("Error occurred while creating transporter:", error);
  }
})();

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log({ email });

  const otp = generateOTP();

  var mailOptions = {
    from: "ferdy.lz2000@gmail.com",
    to: email,
    subject: "OTP form Callback Coding",
    text: `Your OTP is: ${otp}`,
  };

  try {
    if (transporter) {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully!");
      res.send("Email sent successfully!");
    } else {
      console.log("Transporter is not ready yet.");
      res.status(500).send("Transporter is not ready yet.");
    }
  } catch (error) {
    console.log("Error occurred while sending email:", error);
    res.status(500).send("Error occurred while sending email.");
  }
});

module.exports = { sendEmail };
