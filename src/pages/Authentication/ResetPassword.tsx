import { ResetPasswordSchema } from "@/lib/schemas/ForgotPassword";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { SendResetPassword } from "@/lib/Api/Authentication/Authentication";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

function ResetPassword() {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const navigate = useNavigate()
  const [loding, setLoding] = useState(false);
  const { setalrtEror } = useOutletContext();
  const { email, code } = useParams()

  async function onSubmit(data) {
    let prams = {
      email: email,
      code: code,
      password: data.password,
      password_confirmation: data.password_confirmation
    }
    setLoding(true)
    const respons = await SendResetPassword(prams);
    console.log(respons)
    if (respons.status === true) {
      setLoding(false);
      navigate("/login")
      
    } else {
      setLoding(false);
      setalrtEror(respons.message);
    }


    // navigate("/complete-profile")
  }
  return (
    <form
      className=" px-5 py-7 z-10 text-white  border border-orange rounded-2xl w-[95%] md:w-[50%] lg:w-[35%]  bg-black/70 shadow-2xl flex flex-col items-center justify-center gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className=" text-3xl font-bold ">Reset password?</h2>
      <h2 className=" text-lg text-gray-400">Please set your new password</h2>
      <div className=" w-full mt-6">
        <h2 className="text-sm text-gray-300 mb-1">New Password</h2>
        <Input
          {...register("password")}
          aria-invalid={!!formState.errors.password}
          className=" bg-input border-olive-700 border "
          id="fieldgroup-email"
          type="password"
          placeholder="Enter your New Password"
        />
        {formState.errors.password?.message && (
          <p role="alert" className="text-red-500 text-xs mt-1">
            {formState.errors.password?.message}
          </p>
        )}
      </div>
      <div className=" w-full">
        <h2 className="text-sm text-gray-300 mb-1">Re-enter Password</h2>
        <Input
          {...register("password_confirmation")}
          aria-invalid={!!formState.errors.password_confirmation}
          className=" bg-input border-olive-700 border "
          id="fieldgroup-email"
          type="password"
          placeholder="Re-enter your New Password"
        />
        {formState.errors.password_confirmation?.message && (
          <p role="alert" className="text-red-500 text-xs mt-1">
            {formState.errors.password_confirmation?.message}
          </p>
        )}
      </div>
      <Button disabled={loding} type="submit"  className=" w-full bg-orange">
        {loding ? <Spinner className="size-6" /> : "Reset"}
      </Button>
    </form>
  );
}

export default ResetPassword;
