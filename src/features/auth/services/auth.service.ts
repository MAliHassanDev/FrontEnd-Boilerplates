import type { RegisterUserData, SignInUserData } from "../schema/auth.schema";
import { ApiService } from "@/services/api.service";

type SignInResponse = {
  access_token: string;
};

export type UserProfile = Omit<RegisterUserData, "password">;

export type GetUserProfileResponse = {
  user: UserProfile;
};

export class AuthService extends ApiService {
  private static instance: AuthService | undefined;

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new AuthService();
    }
    return this.instance;
  }

  async signInUser(userData: SignInUserData) {
    const response = await this.makePublicRequest<SignInResponse>({
      url: "/auth/login",
      method: "POST",
      withCredentials: true,
      data: userData
    });
    return response;
  }
}

export const authService = AuthService.getInstance();
