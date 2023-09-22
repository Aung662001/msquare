import nodemailer, { TransportOptions, Transporter } from "nodemailer";
import path from "path";
import ejs from "ejs";

interface MailOptions {
  email: string;
  subject: string;
  template: string;
  data: any;
}
const sendMail = async (options: MailOptions) => {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.NM_HOST,
    port: parseInt(process.env.NM_PORT || "587"),
    auth: {
      user: process.env.NM_USER,
      pass: process.env.NM_PASSWORD,
    },
  });

  const { email, subject, template, data } = options;
  const templatePath = path.join(__dirname, "../mails", template);

  const html: string = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: process.env.NM_USER,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
export default sendMail;
