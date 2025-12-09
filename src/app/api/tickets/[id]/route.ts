import { NextRequest, NextResponse } from "next/server";
import Ticket from "@/src/database/models/Ticket";
import dbConnection from "@/src/lib/dbconection";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection();
  const body = await req.json();

  try {
    const ticket = await Ticket.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(ticket);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnection();

  try {
    await Ticket.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Ticket eliminado" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}
