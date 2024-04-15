const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
require("dotenv").config();

async function sendEmail() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://tiny01:tiny02@tiny01.afppr0j.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const emails = await mongoose.connection.db
      .collection("users")
      .distinct("email");

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "santanguyen462@gmail.com",
        pass: "sdmw wjch nxlj rtul",
      },
    });

    let info = await transporter.sendMail({
      from: '"Sale off Tran Hotel" <santanguyen462@gmail.com>',
      to: emails,
      subject: "Send Email",
      html: `
      <h1>Hello World</h1>

      `,
    });

    console.log(info.messageId);
    console.log(info.accepted);
    console.log(info.rejected);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // await mongoose.disconnect();
  }
}

// sendEmail().catch((err) => console.log(err));

export default sendEmail;