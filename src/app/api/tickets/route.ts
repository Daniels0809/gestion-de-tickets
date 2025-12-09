import { NextRequest, NextResponse } from "next/server";
import Ticket from "@/src/database/models/Ticket";
import dbConnection from "@/src/lib/dbconection";

export async function GET(req: NextRequest) {
  await dbConnection();

  const { searchParams } = new URL(req.url);
  const createdBy = searchParams.get("createdBy");
  const status = searchParams.get("status");

  const filters: any = {};
  if (createdBy) filters.createdBy = createdBy;
  if (status) filters.status = status;

  try {
    const tickets = await Ticket.find(filters).sort({ createdAt: -1 });
    return NextResponse.json(tickets);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnection();
  const body = await req.json();

  try {
    const ticket = new Ticket(body);
    await ticket.save();
    return NextResponse.json(ticket, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}
