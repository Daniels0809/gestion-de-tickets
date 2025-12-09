import User from "@/src/database/models/User";
import dbConnection from "@/src/lib/dbconection";
import { NextResponse } from "next/server";



export async function GET(request: Request) {
    try {
        await dbConnection();

        const url = new URL(request.url);
        const token = url.searchParams.get("token");

        if(!token){
            return NextResponse.json({error: "Token de verificacion reqeurido"} , {status: 400});
        }

        const user = await User.findOne({verificationToken: token});

        if(!user){
            return NextResponse.json({error: "Token invalido o expirado"} , {status: 404});
        }

        user.verified = true; //marcar como verificado
        user.verificationToken = undefined; // eliminar el token
        await user.save();

        const loginUrl = `${process.env.URL_FRONTEND}/login?verified=true`;
        return NextResponse.redirect(loginUrl);
    } catch (error) {
        console.error(error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });

    }
}