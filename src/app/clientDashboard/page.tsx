"use client";

import TicketCard from "@/src/components/TicketCard";
import { TicketModal } from "@/src/components/TicketModal";
import Button from "@/src/components/Button";
import { createComment, getCommentsByTicket } from "@/src/services/comment";
import { createTicket, getTickets } from "@/src/services/tikets";
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


const ClientDashboard = () => {
  const { data: session } = useSession();
  const [tickets, setTickets] = useState<TicketState[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<TicketState | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "comment">("create");
  const [isModalOpen, setIsModalOpen] = useState(false);


  const fetchTickets = async () => {
    if (!session) return;

    // Filter tickets to show only those created by the current user
    const filters = { createdBy: session.user?._id };
    const data = await getTickets(filters);

    // Load comments for each ticket
    const ticketsWithComments = await Promise.all(
      data.map(async (ticket) => ({
        ...ticket,
        assignedTo: ticket.assignedTo || undefined,
        comments: await getCommentsByTicket(ticket._id || ""),
      }))
    );

    setTickets(ticketsWithComments);
  };

  // Load tickets when session is available
  useEffect(() => {
    if (!session) return;

    const loadTickets = async () => {
      await fetchTickets();
    };

    loadTickets();
  }, [session]);

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedTicket({
      title: "",
      description: "",
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      createdBy: session?.user?._id || "",
      priority: "low",
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

    if (modalMode === "create") {
      // Create new ticket
      await createTicket(selectedTicket);
    } else if (modalMode === "comment" && selectedTicket._id) {
      // Add comment to existing ticket
      await createComment({
        ticketId: selectedTicket._id,
        author: session?.user?.name || "Unknown",
        message: selectedTicket.description || "",
      });
    }

    setIsModalOpen(false);
    // Refresh tickets list after creating/commenting
    fetchTickets();
  };

  return (
    <div className="p-6">
      {/* Button to create new ticket */}
      <div className="mb-6">
        <Button
          onClick={openCreateModal}
          variant="primary"
          size="md"
        >
          Create Ticket
        </Button>
      </div>

      {/* Grid of ticket cards */}
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
            isAgent={false}
            onComment={() => openCommentModal(ticket)}
          />
        ))}
      </div>

      {/* Modal for creating tickets or adding comments */}
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

export default ClientDashboard;
