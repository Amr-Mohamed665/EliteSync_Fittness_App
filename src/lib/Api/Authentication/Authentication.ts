import type { RegisterFormData } from "@/lib/types/Authentication";
import type { RegisterResponse } from "@/lib/types/Authentication";
import axiosInstance from "@/lib/Axios/axiosInstance";
import type { sinInResponse } from "@/lib/types/Authentication";
import type { SinInFormData } from "@/lib/types/Authentication";
import type { CompleteProfileFormData } from "@/lib/types/Authentication";
import type { ResetPasswordFormData } from "@/lib/types/Authentication";

export async function SendSignUp(
  params: RegisterFormData,
): Promise<RegisterResponse> {
  try {
    const { data } = await axiosInstance.post<RegisterResponse>(
      "/api/register",
      null, // Body
      { params } // Query parameters
    );
    return data;
  } catch (error: any) {
    return error?.response?.data || { status: false, message: "An error occurred" };
  }
}

export async function SendSignIn(
  params: SinInFormData,
): Promise<sinInResponse> {
  try {
    const { data } = await axiosInstance.post<sinInResponse>(
      "/api/login",
      null, // Body
      { params } // Query parameters
    );
    return data;
  } catch (error: any) {
    return error?.response?.data || { status: false, message: "An error occurred" };
  }
}

export async function SendForgotPassword(email: string) {
  try {
    const { data } = await axiosInstance.post("/api/forgot-password", null, {
      params: { email }
    });
    return data;
  } catch (error: any) {
    return error?.response?.data || { status: false, message: "An error occurred" };
  }
}


export async function SendOTP(params: {
  email: string,
  code: string
}) {
  try {
    const { data } = await axiosInstance.post("/api/verify-otp", null, {
      params
    });
    return data;
  }
  catch (err: any) {
    return err.response.data;
  }
}


export async function  SendResetPassword(params: ResetPasswordFormData){
  try {
    const { data } = await axiosInstance.post("/api/reset-password", params);
    return data;
  }
  catch (err: any) {
    return err.response.data;
  }

}


export async function  SendCompleteProfile(params: CompleteProfileFormData){
  try {
    const { data } = await axiosInstance.post("/api/profile/fitness-profile", params);
    return data;
  }
  catch (err: any) {
    return err.response.data;
  }

}

export async function logout() {
  try {
    const { data } = await axiosInstance.post("/api/logout"); // Correcting "logou" typo from postman to "logout"
    localStorage.removeItem("token");
    return data;
  } catch (error: any) {
    return error?.response?.data || { status: false, message: "An error occurred" };
  }
}


export async function deleteAccount() {
  try {
    const { data } = await axiosInstance.delete("/api/delete-account");
    return data;
  } catch (error: any) {
    return error?.response?.data || { status: false, message: "An error occurred" };
  }
}



