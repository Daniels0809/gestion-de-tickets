import { NextRequest, NextResponse } from "next/server";
import Comment from "@/src/database/models/Comment";
import dbConnection from "@/src/lib/dbconection";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  await dbConnection();

  const ticketId = req.nextUrl.searchParams.get("ticketId");
  
  if (!ticketId) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    // Find all comments for the ticket, sorted by creation date (oldest first)
    const comments = await Comment.find({
      ticketId: new mongoose.Types.ObjectId(ticketId)
    }).sort({ createdAt: 1 });

    return NextResponse.json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    return NextResponse.json(
      { message: "Error interno al obtener comentarios" },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  await dbConnection();
  
  try {
    const data = await req.json();
    
    // Validate required fields
    if (!data.ticketId || !data.author || !data.message) {
      return NextResponse.json(
        { message: "Faltan campos requeridos: ticketId, author, message" },
        { status: 400 }
      );
    }

    // Create new comment
    const comment = new Comment({
      ticketId: new mongoose.Types.ObjectId(data.ticketId),
      author: data.author,
      message: data.message,
    });

    await comment.save();
    
    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    console.error("Error creating comment:", err);
    return NextResponse.json(
      { message: "Error interno al crear comentario" },
      { status: 500 }
    );
  }
}
