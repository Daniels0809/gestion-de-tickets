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

console.log("REFRESH_TOKEN:", REFRESH_TOKEN ? "CARGADO" : "VACIO")

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
// Función para enviar correo
async function sendEmail({
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
  attachments?: { filename: string; path?: string; cid?: string; content?: any }[];
}) {
  const { token } = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: MAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: token ?? undefined,
    },
  });

  const mailOptions = {
    from: MAIL,
    to,
    subject: subject ?? "Correo desde mi API Gmail + OAuth2",
    text,
    html,
    attachments,
  };

  const result = await transporter.sendMail(mailOptions);
  return result;
}


// Endpoint API para enviar correos
export async function POST(req: Request) {
  try {
    const { correo, p1, tipo } = await req.json();

    let subject = "Correo desde API Gmail";
    let html = `<h1>Hola amiguito</h1><p>${p1}</p>`;
    let attachments: any[] = [];

    
    switch (tipo) {
      case "html":
        html = `
          <div style="font-family: Arial; background:#f6f6f6; padding:20px;">
            <div style="background:white; padding:20px; border-radius:8px;">
              <h2 style="color:#333;">Correo HTML Avanzado 💌</h2>
              <p>${p1}</p>
              <a href="https://tu-sitio.com" 
                 style="background:#007BFF; color:white; padding:10px 15px; 
                        border-radius:5px; text-decoration:none;">Visitar sitio</a>
            </div>
          </div>
        `;
        break;

      case "imagen":
        html = `
          <h2>Hola</h2>
          <p>Este correo incluye una imagen inline:</p>
          <img src="cid:miimagen" style="width:200px;" />
        `;
        attachments = [
          {
            filename: "globe.svg",
            path: "./public/globe.svg",
            cid: "miimagen",
          },
        ];
        break;

      case "adjunto":
        html = `<p>Correo con archivo adjunto</p>`;
        attachments = [
          {
            filename: "archivo.pdf",
            path: "./archivos/archivo.pdf",
          },
        ];
        break;

      case "template":
        const template = fs.readFileSync("./templates/bienvenida.html", "utf8");
        html = template.replace("{{nombre}}", correo);
        subject = "¡Bienvenido a nuestra app!";
        break;

      default:
        html = `<p>Texto simple: ${p1}</p>`;
        break;
    }

    const result = await sendEmail({
      to: correo,
      subject,
      html,
      attachments,
    });

    return Response.json({ ok: true, message: "Correo enviado", result });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return Response.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}