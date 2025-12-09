import { Schema, model, models } from "mongoose";

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "El titulo es requerido"],
    },
    description: {
      type: String,
      required: [true, "La descripción es requerida"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
    },
    email: {
      type: String,
      required: [true, "El email es requerido"],
    },
    createdBy: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  { timestamps: true }
);

const Ticket = models.Ticket || model("Ticket", ticketSchema);

export default Ticket;
