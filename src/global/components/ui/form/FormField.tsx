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
} & InputHTMLAttributes<HTMLInputElement>;
export function FormField<T extends FieldValues>({
  name,
  label,
  errorMessage,
  register,
  ...rest
}: Props<T>) {
  return (
    <p>
      <label className="form-control">
        <span className="label">
          <span className={`label-text ${errorMessage ? "text-red-500" : ""}`}>
            {label}
          </span>
        </span>

        <input
          className={`input input-bordered ${errorMessage ? "border-red-500" : ""}`}
          {...register(name)}
          {...rest}
        />
      </label>
      {errorMessage && (
        <small className="mt-0.5 block text-red-500">{errorMessage}</small>
      )}
    </p>
  );
}
