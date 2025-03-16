import { axiosPrivate, axiosPublic } from "@/api/axios";
import { logger } from "@/lib/logger";
import { ApiException } from "@/utils/exceptions";
import type { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";

export type ApiError = {
  message: string;
  statusCode: number;
  code: string;
};

export type ApiRequestConfig = {
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  withCredentials?: AxiosRequestConfig["withCredentials"];
  withAuthorization?: boolean;
};

export async function sendApiRequest<R>(
  url: string,
  options: ApiRequestConfig = {},
) {
  const { withAuthorization, ...axiosOptions } = options;
  const axiosInstance = !withAuthorization ? axiosPublic : axiosPrivate;

  try {
    const response = await axiosInstance<R>({ url, ...axiosOptions });
    return response.data;
  } catch (error) {
    logger.error(error, "ApiService");
    if (isAxiosError<ApiError>(error) && error.response) {
      const { message, statusCode, code } = error.response.data;
      throw new ApiException(message, statusCode, code);
    } else {
      throw error;
    }
  }
}

function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}
