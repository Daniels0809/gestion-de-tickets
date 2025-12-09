import { NextResponse } from "next/server";
import dbConnection from "@/src/lib/dbconection";
import * as yup from "yup";
import User from "@/src/database/models/User";
import { sendEmail } from "@/src/lib/sendMail";

const userSchema = yup.object().shape({
  name: yup.string().required("el nombre es obligatorio").min(3),
  email: yup.string().email().required("El email es obligatorio"),
  cedula: yup.string().required("la cedula es obligatoria").min(2),
  password: yup.string().required("La contraseña es obligatoria").min(2),
  role: yup.string().oneOf(["client", "agent"]).default("client"),
});

export async function POST(req: Request) {
  try {
    await dbConnection();
    console.log("DB conectada");

    const body = await req.json();
    const validData = await userSchema.validate(body, { abortEarly: false });

    const { name, email, cedula, password, role } = validData;

    const userExist = await User.findOne({ $or: [{ email }, { cedula }] });

    if (userExist) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const newUser = await User.create({
      name,
      email,
      cedula,
      password,
      role,
    });

    // let emailSent = false;

    // try {
    //   await sendEmail({
    //     to: email,
    //     subject: "Registro exitoso - Sistema de Tickets",
    //     html: `
    //       <div style="font-family: Arial; padding: 20px;">
    //         <h2>¡Hola ${name}!</h2>
    //         <p>Tu cuenta se creó exitosamente en el sistema de tickets.</p>

    //         <p><strong>Email:</strong> ${email}</p>
    //         <p><strong>Cédula:</strong> ${cedula}</p>
    //         <p><strong>Rol asignado:</strong> ${role}</p>

    //         <br />
    //         <p>Ya puedes iniciar sesión.</p>
    //         <p style="color:#999;">(No respondas este correo)</p>
    //       </div>
    //     `,
    //   });

    //   emailSent = true;

    // } catch (emailError) {
    //   console.error("⚠️ Error enviando correo:", emailError);
    // }

    return NextResponse.json(
      {
    message: "Usuario registrado (correo desactivado temporalmente)",
    userId: newUser._id,
  },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error en el registro:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
