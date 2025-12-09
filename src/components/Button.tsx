import React from "react";

export interface ButtonProps {

  children: React.ReactNode;

  variant?: "primary" | "secondary" | "danger";

  size?: "sm" | "md" | "lg";
  
  onClick?: () => void;
 
  type?: "button" | "submit" | "reset";

  disabled?: boolean;

  className?: string;

  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  fullWidth = false,
}) => {

  const baseClasses = "font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 disabled:bg-blue-400",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 disabled:bg-gray-400",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 disabled:bg-red-400",
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className} ${
    disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
  }`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {children}
    </button>
  );
};

export default Button;

