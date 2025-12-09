import React from "react";
import Button from "./Button";
import Badge from "./Badge";

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
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300/90 text-sm mb-3 line-clamp-2">{description}</p>
      
      {/* Status and Priority Badges */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {status && (
          <Badge variant="status" value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
          </Badge>
        )}
        <Badge variant="priority" value={priority}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
      </div>

      {assignedTo && (
        <p className="text-gray-400 text-sm mb-2">Assigned to: {assignedTo}</p>
      )}
      {createdAt && (
        <p className="text-gray-500 text-xs mb-3">Created: {createdAt.split("T")[0]}</p>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        {onComment && (
          <Button
            onClick={onComment}
            variant="primary"
            size="sm"
            fullWidth
          >
            Comment
          </Button>
        )}
        {isAgent && onEdit && (
          <Button
            onClick={onEdit}
            variant="secondary"
            size="sm"
            fullWidth
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
