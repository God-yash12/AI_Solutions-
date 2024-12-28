const nodemailer = require("nodemailer");
const path = require("path");

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "gunyash665@gmail.com", 
    pass: "vdgo bpkm mdho qagy", 
  },
});

// Function to send an email
const sendResponse = async (recipientEmail, subject, responseMessage) => {
  const emailOptions = {
    from: {
      name: "AI Solution",
      address: "gunyash665@gmail.com",
    },
    to: recipientEmail,
    subject: subject || "Inquiry Response by AI Solution",
    text: responseMessage,
    html: `<p>${responseMessage}</p>`, 
    attachments: [
      {
        filename: "Logo.png",
        path: path.join(__dirname, "Logo.png"),
        contentType: "image/png",
      },
    ],
  };

  try {
    const info = await transporter.sendMail(emailOptions);
    console.log("Email has been sent:", info.response);
    return info.response;
  } catch (error) {
    console.error("Error occurred:", error.message);
    throw new Error("Failed to send email");
  }
};

module.exports = sendResponse;
