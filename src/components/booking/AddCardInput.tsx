import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

interface AddCardInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  register?: UseFormRegisterReturn;
}

const AddCardInput = ({
  placeholder,
  value,
  onChange,
  type,
  name,
  className,
  id,
  error,
  register,
  ...props
}: AddCardInputProps) => {
  return (
    <div>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full  border border-gray-600 rounded-lg bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-orange",
          error ? "border-red-500" : "border-gray-500",
          className
        )}
        {...register}
        {...props}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default AddCardInput;
