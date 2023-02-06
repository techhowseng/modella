import sgMail, { MailDataRequired } from "@sendgrid/mail";
import isHtml from 'is-html';
import path from "path";
import { createWriteStream, readFile } from "fs";
import dotenv from "dotenv";
dotenv.config();

export default function sendMail (to, subject, payload ) {
  const apiKey = process.env.SENDGRID_API_KEY;
  sgMail.setApiKey(apiKey);

  const message: MailDataRequired = {
    to,
    from: process.env.MAIL_SENDER,
    subject,
    text: "skfdjglksdfgskjfds",
    // html: ""
  };

  sgMail
    .send(message)
    .then(() => {
      console.info("Message send success");

    })
    .catch((err) => {
      console.error(`Message send failed: ${err}`);
    });
}
