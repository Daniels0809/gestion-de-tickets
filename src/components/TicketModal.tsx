"use client";
import React from "react";
import Button from "./Button";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  mode: "create" | "edit" | "delete" | "comment";
  ticket: {
    _id?: string;
    title: string;
    description: string;
    status?: string;
    priority?: string;
    assignedTo?: string;
  };
  setTicket: React.Dispatch<React.SetStateAction<any>>;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  ticket,
  setTicket,
}) => {
  if (!isOpen) return null;

  return (
    <div className="text-black fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {mode === "create" && "Create Ticket"}
          {mode === "edit" && "Edit Ticket"}
          {mode === "comment" && "Add Comment"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-3"
        >
          {(mode === "create" || mode === "edit") && (
            <>
              <input
                type="text"
                placeholder="Title"
                value={ticket.title}
                onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
              <textarea
                placeholder="Description"
                value={ticket.description}
                onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </>
          )}

          {mode === "edit" && (
            <>
              <select
                value={ticket.status}
                onChange={(e) => setTicket({ ...ticket, status: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>

              <select
                value={ticket.priority}
                onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <input
                type="text"
                placeholder="Assign to (Agent Email)"
                value={ticket.assignedTo || ""}
                onChange={(e) => setTicket({ ...ticket, assignedTo: e.target.value })}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </>
          )}

          {mode === "comment" && (
            <textarea
              placeholder="Your comment"
              value={ticket.description}
              onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          )}

          <div className="flex justify-end gap-3 mt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              size="md"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
