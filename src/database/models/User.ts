import { Schema, model, models } from "mongoose";

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
    },
    email: {
      type: String,
      required: [true, "El email es requerido"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    cedula: {
      type: String,
      required: [true, "La cédula es requerida"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
    },
    role: {
      type: String,
      enum: ["client", "agent"],
      required: true,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", usersSchema);

export default User;
