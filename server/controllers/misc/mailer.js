const nodemailer = require('nodemailer');
const { keyMailer } = require('../../keys/mailer');
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: keyMailer.GOOGLE_USER,
    pass: keyMailer.GOOGLE_PASSWORD
  }
});

const sendEmail = (from, to, subject, html) => {
  return new Promise((resolve, reject) => {
    transport.sendMail({ from, to, subject, html }, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};

module.exports = {
  sendEmail
};
