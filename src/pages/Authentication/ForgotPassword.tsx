import { ForgotPasswordSchema } from "@/lib/schemas/ForgotPassword";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendForgotPassword } from "@/lib/Api/Authentication/Authentication";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

function ForgotPassword() {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const [loding, setLoding] = useState(false);
  const navigate = useNavigate()
  const { setalrtEror } = useOutletContext();

  async function onSubmit(data) {
    setLoding(true);
    const respons = await SendForgotPassword(data);
    if (respons.status === true) {
      setLoding(false);
      navigate(`/verify/${data.email}/resetPassword`)
    } else {
      setLoding(false);
      const firstErrorKey = Object.keys(respons.error)[0];
      setalrtEror(respons.error[firstErrorKey][0]);
    }
  }
  return (
    <form
      className=" px-5 py-7 z-10 text-white  border border-orange rounded-2xl w-[95%] md:w-[55%] lg:w-[35%]  bg-black/70 shadow-2xl flex flex-col items-center justify-center gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className=" text-3xl font-bold text-center ">Forgot your password?</h2>
      <h2 className=" text-lg text-gray-400 text-center">
        Enter your Email Address so we can send you a link to reset your
        password!
      </h2>

      <div className=" w-full mt-5">
        <h2 className="text-sm text-gray-300 mb-1">Email</h2>
        <Input
          {...register("email")}
          aria-invalid={!!formState.errors.email}
          className=" bg-input border-olive-700 border"
          id="fieldgroup-email"
          type="email"
          placeholder="Enter your email"
        />
        {formState.errors.email?.message && (
          <p role="alert" className="text-red-500 text-xs mt-1">
            {formState.errors.email?.message}
          </p>
        )}
      </div>

      <div className=" w-full my-2 text-center">
        <Button disabled={loding} type="submit" className=" w-full bg-orange">
          {loding ? <Spinner className="size-6" /> : "send"}
        </Button>

      </div>

      <Link
        className="text-orange  font-bold"
        to={"/login"}
      >
        Go back to Login
      </Link>
    </form>
  );
}

export default ForgotPassword;
