import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { SendOTP } from "@/lib/Api/Authentication/Authentication";
import { useOutletContext } from "react-router-dom";

function VerifyEmail() {
  const { email, navigateTo } = useParams()
  const [otp, setOtp] = useState("");
  const navigate = useNavigate()
  const [loding, setLoding] = useState(false);
  const { setalrtEror } = useOutletContext();

  async function Verify() {
    if (otp.length >= 6) {
      let data = {
        "email": email,
        "code": otp
      }

      setLoding(true)
      const respons = await SendOTP(data);
      if (respons.status === true) {
        setLoding(false);
        if (navigateTo === "login") {
          navigate("/login")
        } else {
          navigate(`/reset-password/${data.email}/${data.code}`)
        }

      } else {
        setLoding(false);
        setalrtEror(respons.message);
      }

    }
  }

  async function Resend() {
    console.log("Resend");
  }

  return (
    <div className=" px-5 py-7 z-10 text-white  border border-orange rounded-2xl w-[95%] md:w-[55%] lg:w-[35%]  bg-black/70 shadow-2xl flex flex-col items-center justify-center gap-3">
      <h2 className=" text-3xl font-bold ">Enter Verification Code</h2>
      <h2 className=" text-lg text-gray-400 text-center">
        Please enter code that we have sent to your email
      </h2>

      <div className="my-6">
        <InputOTP
          value={otp}
          onChange={(value) => setOtp(value)}
          maxLength={6}
          className="mx-auto w-fit gap-3"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="w-11 h-11 text-xl" />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={1} className="w-11 h-11 text-xl" />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={2} className="w-11 h-11 text-xl" />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={3} className="w-11 h-11 text-xl" />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={4} className="w-11 h-11 text-xl" />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={5} className="w-11 h-11 text-xl" />
          </InputOTPGroup>

        </InputOTP>
      </div>
      <Button disabled={loding} onClick={Verify} className=" w-full bg-orange">
        {loding ? <Spinner className="size-6" /> : "Verify"}
      </Button>

      <h2 className=" mt-1 text-gray-100 text-sm font-semibold">
        Don’t receive the code?{" "}
        <span onClick={Resend} className="text-orange cursor-pointer">
          Resend 00:34
        </span>
      </h2>
    </div>
  );
}

export default VerifyEmail;
