import type { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  outline?: boolean;
  shape: "primary" | "neutral" | "secondary" | "accent";
  pending?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  shape,
  pending,
  onClick,
  children,
  outline,
  className,
  ...buttonAttributes
}: ButtonProps) => {
  return (
    <button
      className={`btn ${shape === "primary" ? "btn-primary" : shape === "secondary" ? "btn-secondary" : shape === "accent" ? "btn-accent" : "btn-neutral"} ${outline ? "btn-outline" : ""} ${className}`}
      onClick={onClick}
      {...buttonAttributes}
      disabled={pending}
    >
      {pending ? <span className="loading loading-spinner"></span> : children}
    </button>
  );
};
