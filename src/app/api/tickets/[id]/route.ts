import { NextRequest, NextResponse } from "next/server";
import Ticket from "@/src/database/models/Ticket";
import dbConnection from "@/src/lib/dbconection";
import mongoose from "mongoose";


export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  await dbConnection();
  const body = await req.json();
  const {id} = await context.params;
  
  
  try {
    // Find the ticket by ID
    const ticket = await Ticket.findById(new mongoose.Types.ObjectId(id));

    if (!ticket) {
        return NextResponse.json({ message: "Ticket no encontrado" }, { status: 404 });
    }

    // Apply changes from request body to ticket object
    Object.assign(ticket, body);

    // Save ticket (runs validations and pre-save middleware)
    const updatedTicket = await ticket.save(); 
    

    return NextResponse.json(updatedTicket);
  } catch (err: any) {
    console.error("Error en PUT /api/tickets/[id]:", err);
    
    if (err.name === 'ValidationError') {
        return NextResponse.json({ error: "Datos de actualización inválidos." }, { status: 400 });
    }
    
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}