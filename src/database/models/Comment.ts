import { Schema, model, models } from "mongoose";

const commentSchema = new Schema(
  {
    ticketId: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
      required: [true, "El ID del ticket es requerido"],
    },
    author: {
      type: String,
      required: [true, "El autor es requerido"],
    },
    message: {
      type: String,
      required: [true, "El mensaje es requerido"],
    },
  },
  { timestamps: true }
);

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
