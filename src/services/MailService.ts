import sgMail, { MailDataRequired } from "@sendgrid/mail";
import isHtml from 'is-html';
import path from "path";
// import _jade from "jade";
import { createWriteStream, readFile } from "fs";
import dotenv from "dotenv";
dotenv.config();

export default function sendMail (to: any, subject: string, payload: string ) {
  const apiKey = process.env.SENDGRID_API_KEY;
  sgMail.setApiKey(apiKey);

  const template = path.join(process.cwd(), "email-templates", "index.jade");
  readFile(template, 'utf8', async function (err, file) {

    if (err) {
      console.error('send confirmation email', err);
      throw new Error('Error sending confirmation email');
    }
    const context = {
      subject: '',
      title: '',
      header: '',
      bodyTitle: '',
      bodyDescription: '',
      buttonText: '',
      buttonLink: '',
    };
    // const compiledTmpl = _jade.compile(file, context);
    // const html = compiledTmpl(context);
    const html = isHtml(payload) ? payload : file;
    const msg: MailDataRequired = {
      to,
      from: process.env.MAIL_SENDER,
      subject,
      html,
    };

    try {
      const emailRes = await sgMail.send(msg);
      console.log('email result: ', emailRes);

    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  });
}
