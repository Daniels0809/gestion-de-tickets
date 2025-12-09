import axios from "axios";

export const registerService = async (data: {
  name: string;
  email: string;
  cedula: string;
  password: string;
  role: "client" | "agent";
}) => {
  try {
    const res = await axios.post("/api/auth/register", data);
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || "Error al registrar usuario"
    );
  }
};
