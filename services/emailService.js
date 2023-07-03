const nodeMailer = require("nodemailer");

var mail_transport = nodeMailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});


const sendMailFunction = (data) => {
    try {
        // Sample values
        // mailOptions = {
        //     from: '"SenderName" <sender@bedrockapps.org>',
        //     to: "receiver@bedrockapps.org",
        //     subject: `Test Sample mail Subject`,
        //     text: `Sample mail text`,
        //     html: mail content (note:In HTML format) 
        //   };
        const mailOptions = {
            from: `${data.name} <${data.email}>`,
            to: data.to,
            subject: data.subject,
            html: data.html,
        };
        mail_transport.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              resolve({ status: false, message: error.message });
              return;
            } else {
              console.log("Message sent: " + info.response);
              resolve({ status: true, message: `Sent the notification Email!!` });
              return;
            }
          });
    }
    catch (error) {
        return { status: false, message: error.message };
    }

}

module.exports = {
    sendMailFunction,
};
