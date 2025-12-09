import { NextRequest, NextResponse } from "next/server";

let comments = [
  // array de comentarios de ejemplo
];

export async function GET(req: NextRequest) {
  const ticketId = req.nextUrl.searchParams.get("ticketId");
  if (!ticketId) return NextResponse.json([], { status: 200 });

  const filtered = comments.filter(c => c.ticketId === ticketId);
  return NextResponse.json(filtered);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  comments.push({ ...data, _id: Date.now().toString() });
  return NextResponse.json({ ok: true });
}
