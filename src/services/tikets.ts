import axios from "axios";

export interface TicketProps {
  _id?: string;
  title: string;
  description: string;
  name: string;
  email: string;
  createdBy: string;
  assignedTo?: string | null;
  status?: "open" | "in_progress" | "resolved" | "closed";
  priority?: "low" | "medium" | "high";
  createdAt?: string;
  updatedAt?: string;
}

// Listar tickets (con opción de filtrar por usuario o estado)
export const getTickets = async (filters?: { createdBy?: string; status?: string }) => {
  const res = await axios.get("/api/tickets", { params: filters });
  return res.data as TicketProps[];
};

// Crear ticket
export const createTicket = async (ticket: TicketProps) => {
  const res = await axios.post("/api/tickets", ticket);
  return res.data;
};

// Actualizar ticket
export const updateTicket = async (_id: string, ticket: Partial<TicketProps>) => {
  const res = await axios.put(`/api/tickets/${_id}`, ticket);
  return res.data;
};

// Eliminar ticket (opcional)
export const deleteTicket = async (_id: string) => {
  const res = await axios.delete(`/api/tickets/${_id}`);
  return res.data;
};
