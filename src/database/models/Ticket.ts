import { Schema, model, models } from "mongoose";

const ticketSchema = new Schema(
  {
    // Ticket title/subject
    title: {
      type: String,
      required: [true, "El titulo es requerido"],
    },
    // Detailed description of the issue
    description: {
      type: String,
      required: [true, "La descripción es requerida"],
      trim: true,
    },
    // Name of the person who created the ticket
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
    },
    // Email of the person who created the ticket
    email: {
      type: String,
      required: [true, "El email es requerido"],
    },
    // ID of the user who created the ticket (reference to User)
    createdBy: {
      type: String,
      required: true,
    },
    // ID of the agent assigned to handle this ticket (optional)
    assignedTo: {
      type: String,
      default: null,
    },
    // Current status of the ticket
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open",
    },
    // Priority level of the ticket
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Ticket = models.Ticket || model("Ticket", ticketSchema);

export default Ticket;
