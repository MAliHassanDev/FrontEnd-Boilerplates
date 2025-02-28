import type { RegisterUserData, SignInUserData } from "../schema/auth.schema";
import { makeApiRequest } from "@/services/api.service";

type SignInResponse = {
  access_token: string;
};

export type UserProfile = Omit<RegisterUserData, "password">;

export type GetUserProfileResponse = {
  user: UserProfile;
};

export async function signInUser(userData: SignInUserData) {
  const response = await makeApiRequest<SignInResponse>({
    url: "/auth/login",
    method: "POST",
    withCredentials: true,
    data: userData,
  });
  return response;
}
