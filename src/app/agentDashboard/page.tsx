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

  // Filter states
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [search, setSearch] = useState("");

  const fetchTickets = async () => {
    if (!session) return;

    // Build filters object
    const filters: any = {};
    if (statusFilter) filters.status = statusFilter;
    if (priorityFilter) filters.priority = priorityFilter;
    if (search) filters.search = search;

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

  // Load tickets when session or filters change
  useEffect(() => {
    if (!session) return;
    fetchTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, statusFilter, priorityFilter, search]);

  const openEditModal = (ticket: TicketState) => {
    setModalMode("edit");
    setSelectedTicket({
      ...ticket,
      assignedTo: ticket.assignedTo || undefined,
      priority: ticket.priority || "low",
    });
    setIsModalOpen(true);
  };

  /**
   * Opens modal to add a comment to a ticket
   */
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
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {(statusFilter || priorityFilter || search) && (
          <button
            onClick={() => {
              setStatusFilter("");
              setPriorityFilter("");
              setSearch("");
            }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
          >
            Clear
          </button>
        )}
      </div>

      {/* Tickets Grid */}
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

      {/* Modal for editing tickets or adding comments */}
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
