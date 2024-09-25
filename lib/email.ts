//@ts-nocheck
import nodemailer from "nodemailer";

//from: "onboarding@resend.dev",
// to: email,
// subject: "2FA Code",
// html: `<p>Your 2FA code: ${token}</p>`,

interface optionsInterface {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (options: optionsInterface) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: {
      name: "auth-email",
      address: process.env.USER,
    },
    to: options.to,
    subject: options.subject,
    html: options.html,
  };
  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};
