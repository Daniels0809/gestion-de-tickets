import axios from "axios";

export interface CommentProps {
  _id?: string;
  ticketId: string;
  author: string;
  message: string;
  createdAt?: string;
}

// Listar comentarios por ticket
export const getCommentsByTicket = async (ticketId: string) => {
  const res = await axios.get("/api/comments", { params: { ticketId } });
  return res.data as CommentProps[];
};

// Crear comentario
export const createComment = async (comment: CommentProps) => {
  const res = await axios.post("/api/comments", comment);
  return res.data;
};
