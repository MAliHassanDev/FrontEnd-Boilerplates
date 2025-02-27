import { axiosPublic } from "@/api/axios";

type RefreshTokenResponse = {
  access_token: string;
};

export class TokenService {
  public refreshAuthToken = async () => {
    const response = await axiosPublic<RefreshTokenResponse>({
      method: "POST",
      url: "/auth/refresh-token",
      withCredentials: true
    });
    const newAuthToken = response.data.access_token;
    return newAuthToken;
  };
}

export const tokenService = new TokenService();
