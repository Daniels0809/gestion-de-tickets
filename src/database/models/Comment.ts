import { Schema, model, models } from "mongoose";


const commentSchema = new Schema(
  {
    // Reference to the ticket this comment belongs to
    ticketId: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
      required: [true, "El ID del ticket es requerido"],
    },
    // Name of the person who wrote the comment
    author: {
      type: String,
      required: [true, "El autor es requerido"],
    },
    // Comment message content
    message: {
      type: String,
      required: [true, "El mensaje es requerido"],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
