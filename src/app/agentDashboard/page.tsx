"use client";

import TicketCard from "@/src/components/TicketCard";
import { TicketModal } from "@/src/components/TicketModal";
import { createComment, getCommentsByTicket } from "@/src/services/comment";
import { getTickets, updateTicket } from "@/src/services/tikets";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface TicketState {
  _id?: string;
  title: string;
  description: string;
  name: string;
  email: string;
  createdBy: string;
  assignedTo?: string;
  status?: "open" | "in_progress" | "resolved" | "closed";
  priority?: "low" | "medium" | "high";
  comments?: any[];
  createdAt?: string;
}

const AgentDashboard = () => {
  const { data: session } = useSession();
  const [tickets, setTickets] = useState<TicketState[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<TicketState | null>(null);
  const [modalMode, setModalMode] = useState<"edit" | "comment">("edit");
  const [isModalOpen, setIsModalOpen] = useState(false);

 const fetchTickets = async () => {
    if (!session) return;

    const filters = { };
    const data = await getTickets(filters);

    const ticketsWithComments = await Promise.all(
      data.map(async (ticket) => ({
        ...ticket,
        assignedTo: ticket.assignedTo || undefined,
        comments: await getCommentsByTicket(ticket._id || ""),
      }))
    );

    setTickets(ticketsWithComments);
  };
useEffect(() => {
  if (!session) return;

  const loadTickets = async () => {
    await fetchTickets();
  };

  loadTickets();
}, [session]);
  const openEditModal = (ticket: TicketState) => {
    setModalMode("edit");
    setSelectedTicket({
      ...ticket,
      assignedTo: ticket.assignedTo || undefined,
      priority: ticket.priority || "low",
    });
    setIsModalOpen(true);
  };

  const openCommentModal = (ticket: TicketState) => {
    setModalMode("comment");
    setSelectedTicket({ ...ticket, description: "" });
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!selectedTicket) return;

    if (modalMode === "edit" && selectedTicket._id) {
      await updateTicket(selectedTicket._id, selectedTicket);
    } else if (modalMode === "comment" && selectedTicket._id) {
      await createComment({
        ticketId: selectedTicket._id,
        author: session?.user?.name || "Unknown",
        message: selectedTicket.description || "",
      });
    }

    setIsModalOpen(false);
    fetchTickets();
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket._id}
            title={ticket.title}
            description={ticket.description}
            status={ticket.status}
            priority={ticket.priority || "low"}
            assignedTo={ticket.assignedTo}
            createdAt={ticket.createdAt}
            isAgent={true}
            onEdit={() => openEditModal(ticket)}
            onComment={() => openCommentModal(ticket)}
          />
        ))}
      </div>

      {selectedTicket && (
        <TicketModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          ticket={selectedTicket}
          setTicket={setSelectedTicket}
          mode={modalMode}
        />
      )}
    </div>
  );
};

export default AgentDashboard;
