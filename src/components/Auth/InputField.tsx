import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  register: object;
  error?: { message?: string };
  icon?: React.ReactNode;
}

export default function InputField({
  label,
  placeholder,
  type = "text",
  register,
  error,
  icon,
}: InputFieldProps) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-2">
      <label className="text-white/80 text-sm">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a1a1a1]">
            {icon}
          </span>
        )}
        <input
          {...register}
          type={isPassword && show ? "text" : type}
          placeholder={placeholder}
          className="w-full h-12 rounded-md bg-[#2d2d2d] border border-[#3A3A3A] outline-none pl-10 pr-10 text-white caret-white"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#a1a1a1]">
            {show ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-400 text-sm">{error.message}</p>}
    </div>
  );
}
