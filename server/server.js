const express = require("express");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "docapp12345@gmail.com",
    pass: "hpbbjpfhmpjuikmb",
  },
});

app.get("/api", (req, res) => {
  console.log("Hello from client");
  res.json({ message: "Hello from server!" });
});

app.post("/api/send-email", (req, res) => {
  //getting the to, subject and html from the request body
  const { to, subject, html } = req.body;

  //configuring the mail options
  const mailOptions = {
    from: "docapp12345@gmail.com",
    to,
    subject,
    html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.message);
    }
    res.status(200).send("Email sent successfully");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
