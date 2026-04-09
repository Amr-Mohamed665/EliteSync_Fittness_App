import { LockKeyholeIcon, ShieldCheck } from "lucide-react";
import InputField from "../../components/Auth/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type signUpFormData } from "@/lib/schemas/signup.schema";

const fields = [
  {
    label: "Current Password",
    placeholder: "Enter your current password",
    key: "currentPassword" as const,
  },
  {
    label: "New Password",
    placeholder: "Enter your new password",
    key: "password" as const,
  },
  {
    label: "Confirm New Password",
    placeholder: "Re-enter your new password",
    key: "confirmPassword" as const,
  },
];

export default function SecurityPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: signUpFormData) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-8 px-4 sm:px-10">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Security & Password
        </h2>
        <p className="text-sm text-[#a1a1a1] mt-1 p-1">
          Keep your account safe by using a strong password
        </p>
      </div>

      <div className="border border-[#a1a1a1] rounded-2xl overflow-hidden">
        <div className="flex items-center gap-4 px-8 py-6 border-b border-[#a1a1a1]">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <ShieldCheck size={20} className="text-primary" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">Change Password</h4>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-8">
          <div className="flex flex-col gap-5 max-w-lg">
            {fields.map(({ label, placeholder, key }) => (
              <InputField
                key={key}
                label={label}
                placeholder={placeholder}
                type="password"
                register={register("password")}
                error={errors.password}
                icon={<LockKeyholeIcon size={16} />}
              />
            ))}
          </div>

          <hr className="border-[#a1a1a1] max-w-lg" />

          <button className="w-full max-w-lg h-13 text-base font-semibold text-white bg-primary rounded-xl hover:bg-primary/90 hover:-translate-y-0.5 shadow-lg shadow-primary/25 transition-all duration-200 cursor-pointer">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
