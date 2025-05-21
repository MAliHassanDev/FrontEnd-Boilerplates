import { axiosPublic } from "@/api/axios";

type RefreshTokenResponse = {
  accessToken: string;
  role: number;
};

export async function refreshAuthToken() {
  const response = await axiosPublic<RefreshTokenResponse>({
    method: "POST",
    url: "/auth/refresh-token",
    withCredentials: true,
  });
  return response.data;
}
