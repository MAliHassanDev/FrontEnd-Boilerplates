import type { SignInUserData } from "../schema/auth.schema";
import { sendApiRequest } from "@/common/services/api.service";

type SignInResponse = {
  accessToken: string;
  role: number;
};

export async function signInUser(userData: SignInUserData) {
  const response = await sendApiRequest<SignInResponse>("/auth/login", {
    method: "POST",
    withCredentials: true,
    data: userData,
  });
  return response;
}
