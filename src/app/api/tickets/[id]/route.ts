import { NextRequest, NextResponse } from "next/server";
import Ticket from "@/src/database/models/Ticket";
import dbConnection from "@/src/lib/dbconection";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection();
  const body = await req.json();

  // ... (Verificación de ROL/Sesión aquí) ...
  
  try {
    // 1. Encontrar el documento
    const ticket = await Ticket.findById(params.id);

    if (!ticket) {
        return NextResponse.json({ message: "Ticket no encontrado" }, { status: 404 });
    }

    // 2. Aplicar los cambios del body de forma segura
    Object.assign(ticket, body); // Copia las propiedades del body al objeto ticket

    // 3. Guardar (ejecuta validaciones y middleware 'pre save')
    const updatedTicket = await ticket.save(); 
    
    // [INTEGRACIÓN] Disparar correo, etc.

    return NextResponse.json(updatedTicket);
  } catch (err: any) {
    console.error("Error en PUT /api/tickets/[id]:", err);
    
    if (err.name === 'ValidationError') {
        return NextResponse.json({ error: "Datos de actualización inválidos." }, { status: 400 });
    }
    
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}