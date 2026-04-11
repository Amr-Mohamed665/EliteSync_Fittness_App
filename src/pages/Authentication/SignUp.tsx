import { registerSchema } from "@/lib/schemas/SignUpValidation";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GoogleIcone from "./icones/proicons_google.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import type { RegisterFormData, AuthContextType } from "@/lib/types/Authentication";
import "../../index.css";
import { SendSignUp } from "@/lib/Api/Authentication/Authentication";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useOutletContext } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { API_BASE_URL } from "@/lib/Axios/axiosInstance";
import axiosInstance from "@/lib/Axios/axiosInstance";

function SignUp() {
  const [loding, setLoding] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { setalrtEror } = useOutletContext<AuthContextType>();

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const navigate = useNavigate();

  async function onSubmit(data: RegisterFormData) {
    setLoding(true);
    const respons = await SendSignUp(data);

    if (respons.status === true) {
      setLoding(false);
      navigate(`/verify/${data.email}/login`)
    } else {
      setLoding(false);
      if (respons.errors) {
        const firstErrorKey = Object.keys(respons.errors)[0];
        setalrtEror(respons.errors[firstErrorKey][0]);
      } else {
        setalrtEror(respons.message);
      }
    }
  }

  return (
    <form
      className=" px-5 py-7 z-10 text-white  border border-orange rounded-2xl w-[95%] md:w-[50%] lg:w-[35%]  bg-black/70 shadow-2xl flex flex-col items-center justify-center gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className=" text-3xl font-bold ">Sign Up</h2>

      <div className=" w-full">
        <h2 className="text-sm text-gray-300 mb-1">name</h2>
        <Input
          {...register("name")}
          aria-invalid={!!formState.errors.name}
          className=" bg-input border-olive-700 border"
          id="fieldgroup-email"
          type="text"
          placeholder="Enter your name"
        />
        {formState.errors.name?.message && (
          <p role="alert" className="text-red-500 text-xs mt-1">
            {formState.errors.name?.message}
          </p>
        )}
      </div>

      <div className=" w-full">
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

      <div className=" w-full">
        <h2 className="text-sm text-gray-300 mb-1">Password</h2>
        <div className="relative">
          <Input
            {...register("password")}
            aria-invalid={!!formState.errors.password}
            className=" bg-input border-olive-700 border pr-10"
            id="fieldgroup-email"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {formState.errors.password?.message && (
          <p role="alert" className="text-red-500 text-xs mt-1">
            {formState.errors.password?.message}
          </p>
        )}
      </div>

      <div className=" w-full">
        <h2 className="text-sm text-gray-300 mb-1">password confirmation</h2>
        <div className="relative">
          <Input
            {...register("password_confirmation")}
            aria-invalid={!!formState.errors.password_confirmation}
            className=" bg-input border-olive-700 border pr-10"
            id="fieldgroup-email"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Enter your password agin "
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {formState.errors.password_confirmation?.message && (
          <p role="alert" className="text-red-500 text-xs mt-1">
            {formState.errors.password_confirmation?.message}
          </p>
        )}
      </div>

      <div className=" w-full my-2 text-center">
        <Button disabled={loding} type="submit" className=" w-full bg-orange">
          {loding ? <Spinner className="size-6" /> : "Sign Up"}
        </Button>
        <h2 className=" mt-1 text-gray-100 text-sm font-semibold">
          Already have an account?{" "}
          <Link to={"/login"} className="text-orange">
            Login
          </Link>
        </h2>
      </div>
      <div className=" flex items-center text-sm text-gray-300 gap-1 w-full">
        <span className=" border-b border-olive-700 grow "></span>
        <p className="w-fit">Or Sign Up with</p>
        <span className=" border-b border-olive-700 grow"></span>
      </div>
      <Button
        type="button"
        className=" w-full bg-input"
        onClick={async () => {
          try {
            const { data } = await axiosInstance.get("/api/auth/google/redirect");
            if (data.url) {
              window.location.href = data.url;
            }
          } catch (error) {
            console.error("Google Auth Error:", error);
          }
        }}
      >
        <img src={GoogleIcone} alt="" />
      </Button>
    </form>
  );
}

export default SignUp;
