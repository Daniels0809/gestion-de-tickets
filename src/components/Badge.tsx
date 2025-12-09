import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "status" | "priority" | "default";
  value?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  value,
  className = "",
}) => {
  // Base badge classes
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

  // Get color classes based on variant and value
  const getColorClasses = () => {
    if (variant === "status") {
      switch (value) {
        case "open":
          return "bg-blue-100 text-blue-800";
        case "in_progress":
          return "bg-yellow-100 text-yellow-800";
        case "resolved":
          return "bg-green-100 text-green-800";
        case "closed":
          return "bg-gray-100 text-gray-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }

    if (variant === "priority") {
      switch (value) {
        case "low":
          return "bg-green-100 text-green-800";
        case "medium":
          return "bg-yellow-100 text-yellow-800";
        case "high":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    }

    // Default variant
    return "bg-gray-100 text-gray-800";
  };

  const combinedClasses = `${baseClasses} ${getColorClasses()} ${className}`.trim();

  return (
    <span className={combinedClasses}>
      {children}
    </span>
  );
};

export default Badge;

