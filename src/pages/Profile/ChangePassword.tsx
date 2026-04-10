import { ChangePasswordSchema, type ChangePasswordFormData } from "@/lib/schemas/ChangePassword";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getChangePassword } from "@/lib/Api/Authentication/profile";
function ChangePassword() {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(ChangePasswordSchema),
  });


  const { data, isLoading } = useQuery({
    queryKey: ["profile-change-password"],
    queryFn: getChangePassword,
  });
  async function onSubmit(data: ChangePasswordFormData) {
    console.log(data);
  }
  if (isLoading) {
    return <div className="px-4 md:px-8 mt-10">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="  px-4 md:px-8 mt-10">
      <h1 className="text-3xl mb-10 font-semibold">Security & Password</h1>
      <div className=" border border-[#A7A7A7] p-4 rounded-xl flex flex-col items-center gap-3 py-5">
        <h2 className="text-2xl mb-5 ">Change Password</h2>

        <div className=" w-full md:w-[70%]">
          <h2 className="text-sm text-gray-300 mb-1">Current Password</h2>
          <Input
            {...register("CurrentPassword")}
            aria-invalid={!!formState.errors.CurrentPassword}
            className=" bg-input border-olive-700 border "
            id="fieldgroup-email"
            type="password"
            placeholder="Enter your password"
          />
          {formState.errors.CurrentPassword?.message && (
            <p role="alert" className="text-red-500 text-xs mt-1">
              {formState.errors.CurrentPassword?.message}
            </p>
          )}
        </div>

        <div className="  w-full md:w-[70%]">
          <h2 className="text-sm text-gray-300 mb-1">New Password</h2>
          <Input
            {...register("NewPassword")}
            aria-invalid={!!formState.errors.NewPassword}
            className=" bg-input border-olive-700 border "
            id="fieldgroup-email"
            type="password"
            placeholder="Enter your password"
          />
          {formState.errors.NewPassword?.message && (
            <p role="alert" className="text-red-500 text-xs mt-1">
              {formState.errors.NewPassword?.message}
            </p>
          )}
        </div>

        <div className="  w-full md:w-[70%]">
          <h2 className="text-sm text-gray-300 mb-1">Confirm New Password</h2>
          <Input
            {...register("ConfirmNewPassword")}
            aria-invalid={!!formState.errors.ConfirmNewPassword}
            className=" bg-input border-olive-700 border "
            id="fieldgroup-email"
            type="password"
            placeholder="Enter your password"
          />
          {formState.errors.ConfirmNewPassword?.message && (
            <p role="alert" className="text-red-500 text-xs mt-1">
              {formState.errors.ConfirmNewPassword?.message}
            </p>
          )}
        </div>

        <button className="bg-[#FF4D4D] mt-4 w-full md:w-1/2 py-3 rounded block mx-auto text-[#FFFFFF] font-semibold text-sm hover:bg-black border border-[#FF4D4D] transition">
          Update Password {data?.updatePassword}
        </button>
      </div>
    </form>
  );
}

export default ChangePassword;
