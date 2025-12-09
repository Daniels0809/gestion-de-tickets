import React from "react";
// import { t } from "i18next";

interface Props {
  title: string;
  description: string;
  status?: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  assignedTo: string | undefined;
  createdAt?: string;
  onEdit?: () => void;
  onComment?: () => void;
  onDelete?: () => void;
  isAgent?: boolean;
}

export const TicketCard: React.FC<Props> = ({
  title,
  description,
  status,
  priority,
  assignedTo,
  createdAt,
  onEdit,
  onComment,
  onDelete,
  isAgent = false,
}) => {
  

  return (
    <div className="group relative bg-gradient-to-br from-[#050509] via-[#0c0f18] to-[#07070d] rounded-3xl border border-violet-500/10 shadow-lg p-6 hover:-translate-y-1 transition-all duration-300">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-300/90 text-sm mb-2">{description}</p>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-white">Status: {status}</span>
        <span className="text-white">Priority: {priority}</span>
      </div>
      {assignedTo && <p className="text-gray-400 text-sm mb-2">Assigned to: {assignedTo}</p>}
      {createdAt && <p className="text-gray-500 text-xs mb-2">{("Created at")}: {createdAt.split("T")[0]}</p>}

      <div className="flex gap-2 mt-3">
        {onComment && (
          <button
            onClick={onComment}
            className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition"
          >
            {("Comment")}
          </button>
        )}
        {isAgent && onEdit && (
          <button
            onClick={onEdit}
            className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition"
          >
            {("Edit")}
          </button>
        )}
      </div>
    </div>
  );
};
export default TicketCard;
