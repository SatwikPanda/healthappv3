import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "docapp12345@gmail.com",
        pass: "hpbbjpfhmpjuikmb",
        //pass:"hdvyiuvwgdqvtoxt"
      },
    });
    /*const to = "aryanshmohanty77@gmail.com"
        const subject = "love you <3";
        const html = `<h1>Konsi colour ki chaddi pehene ho?</h1>`;*/
    const mailOptions = {
      from: "doctorapplication69@gmail.com",
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error(error);
  }
};

export default sendEmail;
