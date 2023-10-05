const nodemailer = require("nodemailer");
const { email_templates } = require("../services/emailTemplates");

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

// Function to send an email
const sendEmail = async (templateKey, template_data) => {
  try {

    const email_template = email_templates[templateKey];

    const emailText = email_template.text(template_data);
    const emailHtml = email_template.html(template_data);

    const mailOptions = {
      from: '"devisersrealm247" <devisersrealm247@gmail.com>',
      to: template_data.email,
      subject: email_template.subject,
      text: emailText,
      html: emailHtml
    };

    const result = await transporter.sendMail(mailOptions);
    if (result.error) {
      console.error("Error sending email:", result.error);
      return{
        status: false,
        message: "Error sending email",
        error: result.error
      }
    }
    return{
        status: true,
        message: "Email sent successfully",
        data: result
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
    sendEmail
}