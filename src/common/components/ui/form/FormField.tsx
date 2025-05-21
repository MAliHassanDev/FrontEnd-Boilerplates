import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";
import type {
  FieldError,
  FieldPath,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  errorMessage?: FieldError["message"];
  register: UseFormRegister<T>;
  children?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;
export function FormField<T extends FieldValues>({
  name,
  label,
  errorMessage,
  register,
  children,
  className,
  ...rest
}: Props<T>) {
  return (
    <p className={className}>
      <label className="form-control relative">
        <span className="label">
          <span className={`label-text ${errorMessage ? "text-red-500" : ""}`}>
            {label}
          </span>
        </span>

        <input
          {...register(name)}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className,
          )}
          {...rest}
        />
        {children}
      </label>
      {errorMessage && (
        <small className="mt-0.5 block text-red-500">{errorMessage}</small>
      )}
    </p>
  );
}
