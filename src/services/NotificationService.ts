import sendMail from './MailService';

export default class NotificationService {
  static async newSignup({ email, code }) {
    const mailPayload = {
      to: email,
      subject: 'Welcome to Manikeens',
      payload: `Hi, Please click the link below to verify your email.
      ${code}
      `
    };
    await sendMail(mailPayload.to, mailPayload.subject, mailPayload.payload);
  }
};
