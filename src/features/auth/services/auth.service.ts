import type { RegisterUserData, SignInUserData } from "../schema/auth.schema";
import type { AxiosRequestConfig } from "axios";
import { tokenService } from "./token.service";
import { ApiService } from "@/global/services/api.service";
import { config } from "@/config/config";

type SignInResponse = {
  token: string;
};

export type UserProfile = Omit<RegisterUserData, "password">;

export type GetUserProfileResponse = {
  user: UserProfile;
};

class UserService extends ApiService {
  public constructor(config: AxiosRequestConfig) {
    super(config);
  }

  async registerUser(userData: RegisterUserData) {
    return this.makeRequest<UserProfile, RegisterUserData>({
      url: "/user/register",
      method: "POST",
      data: userData,
    });
  }

  async signInUser(userData: SignInUserData) {
    const response = await this.makeRequest<SignInResponse, SignInUserData>({
      url: "/user/login",
      method: "POST",
      data: userData,
    });
    tokenService.setToken(response.token);
    return response;
  }

  public getUserProfile = async () => {
    return this.makeRequest<GetUserProfileResponse>({
      url: "/user/profile",
      headers: {
        Authorization: tokenService.getAuthToken(),
      },
    });
  };

  public logoutUser = () => {
    tokenService.deleteToken();
  };
}

export const userService = new UserService({
  baseURL: config.api.baseUrl,
});
