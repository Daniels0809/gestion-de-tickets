import { NextRequest, NextResponse } from "next/server";
import Ticket from "@/src/database/models/Ticket";
import dbConnection from "@/src/lib/dbconection";


export async function GET(req: NextRequest) {
  await dbConnection();

  // Extract query parameters for filtering
  const { searchParams } = new URL(req.url);
  const createdBy = searchParams.get("createdBy");
  const assignedTo = searchParams.get("assignedTo");
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const search = searchParams.get("search");

  // Build filter object based on provided query params
  const filters: any = {};
  if (createdBy) filters.createdBy = createdBy;
  if (assignedTo) filters.assignedTo = assignedTo;
  if (status) filters.status = status;
  if (priority) filters.priority = priority;

  // If search parameter exists, filter by title or description
  if (search) {
    filters.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  try {
    // Find tickets matching filters, sorted by creation date (newest first)
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
    // Create and save new ticket
    const ticket = new Ticket(body);
    await ticket.save();
    return NextResponse.json(ticket, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}
