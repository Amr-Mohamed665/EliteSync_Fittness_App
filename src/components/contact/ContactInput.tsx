import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type BaseProps = {
  label: string;
  id: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  register?: UseFormRegisterReturn;
};

type InputProps = BaseProps & {
  textarea?: false;
} & InputHTMLAttributes<HTMLInputElement>;

type TextareaProps = BaseProps & {
  textarea: true;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export type ContactInputProps = InputProps | TextareaProps;

const ContactInput = ({
  label,
  id,
  className,
  containerClassName,
  labelClassName,
  textarea = false,
  register,
  error,
  ...props
}: ContactInputProps) => {
  return (
    <div className={cn("w-full flex flex-col gap-2", containerClassName)}>
      <label htmlFor={id} className={cn("text-white font-bold", labelClassName)}>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          className={cn(
            "w-full border rounded-lg py-4 px-2 outline-none",
            error ? "border-red-500" : "border-gray-500",
            className
          )}
          {...register}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={cn(
            "w-full border rounded-lg py-4 px-2 outline-none",
            error ? "border-red-500" : "border-gray-500",
            className
          )}
          {...register}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default ContactInput;
