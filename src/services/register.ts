import axios from "axios";

export const registerService = async (data: {
  name: string;
  email: string;
  cedula: string;
  password: string;
  role: "client" | "agent";
}) => {
  const res = await axios.post("/api/auth/register", data);
  return res.data;
};
