import { config } from "@/config/config";
import { logger } from "@/lib/logger";
import { refreshAuthToken } from "@/common/services/token.service";
import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/core/auth/auth.store";

declare module "axios" {
  interface InternalAxiosRequestConfig {
    sent?: boolean;
  }
}

export const axiosPublic = axios.create({
  baseURL: config.api.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = createPrivateAxiosInstance();

function createPrivateAxiosInstance() {
  const axiosPrivate = axios.create({
    baseURL: config.api.baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // attaches access token in every request header
  axiosPrivate.interceptors.request.use(config => {
    const accessToken = useAuthStore.getState().auth?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  // generates new access token on first unauthorized response
  axiosPrivate.interceptors.response.use(
    response => {
      return response;
    },
    async (error: AxiosError) => {
      const prevRequest = error.config;
      if (error.response?.status === 401 && prevRequest && !prevRequest.sent) {
        prevRequest.sent = true;
        logger.info("Access token expired");
        try {
          const auth = await refreshAuthToken();
          useAuthStore.setState({ auth });
          prevRequest.headers.Authorization = `Bearer ${auth.accessToken}`;
          return await axiosPrivate.request(prevRequest);
        } catch (error: unknown) {
          logger.error(error, "AxiosPrivateInterceptor");
          // remove auth from store if refresh token fails
          useAuthStore.setState({ auth: null });
          if (error instanceof Error) {
            return Promise.reject(error);
          }
        }
      }
      return Promise.reject(error);
    },
  );
  return axiosPrivate;
}
