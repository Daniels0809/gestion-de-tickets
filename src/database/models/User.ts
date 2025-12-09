import { Schema, model, models } from "mongoose";

const usersSchema = new Schema(
  {
    // User's full name
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
    },
    // User's email address (unique, lowercase, trimmed)
    email: {
      type: String,
      required: [true, "El email es requerido"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    // User's identification document (unique)
    cedula: {
      type: String,
      required: [true, "La cédula es requerida"],
      unique: true
    },
    // User's password (should be hashed before saving)
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
    },
    // User role: "client" or "agent"
    role: {
      type: String,
      enum: ["client", "agent"],
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const User = models.User || model("User", usersSchema);

export default User;
