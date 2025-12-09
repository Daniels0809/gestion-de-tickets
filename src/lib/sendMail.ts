import { google } from "googleapis";
import nodemailer from "nodemailer";

const CLIENT_ID = process.env.CLIENT_ID!;
const CLIENT_SECRET = process.env.CLIENT_SECRET!;
const REDIRECT_URI = process.env.REDIRECT_URI!;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN!;
const MAIL = process.env.MAIL!;



const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
console.log(await oAuth2Client.getAccessToken());

console.log("REFRESH_TOKEN:", REFRESH_TOKEN ? "CARGADO" : "VACIO");

export async function sendEmail({
  to,
  subject,
  text,
  html,
  attachments,
}: {
  to: string;
  subject?: string;
  text?: string;
  html?: string;
  attachments?: any[];
}) {
  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: MAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken?.token ?? undefined,
    },
  });

  return transporter.sendMail({
    from: MAIL,
    to,
    subject: subject ?? "Correo desde API Gmail + OAuth2",
    text,
    html,
    attachments,
  });
}
