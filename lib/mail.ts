import { Resend } from "resend";
import { sendEmail } from "@/lib/email";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  // await resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: email,
  //   subject: "2FA Code",
  //   html: `<p>Your 2FA code: ${token}</p>`,
  // });

  // Khud ka free of cost email sending machine
  const options = {
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  };
  await sendEmail(options);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  // await resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: email,
  //   subject: "Reset your password",
  //   html: `<p>Click <a href=${resetLink}>here</a> to confirm email.</p>`,
  // });

  const options = {
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href=${resetLink}>here</a> to confirm email.</p>`,
  };
  await sendEmail(options);
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  // await resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: email,
  //   subject: "Confirm your email",
  //   html: `<p>Click <a href=${confirmLink}>here</a> to confirm email.</p>`,
  // });

  const options = {
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href=${confirmLink}>here</a> to confirm email.</p>`,
  };
  await sendEmail(options);
};
