import sendEmail from "./sendemail.js";

const test = async () => {
    try {
        await sendEmail();
        console.log("Email sent successfully");
    } catch (error) {
        console.log(error)
    }
};

test();