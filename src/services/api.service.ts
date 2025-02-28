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

export type ApiRequestOptions = {
  type: "public" | "private";
}

export async  function makeApiRequest<R>(config: AxiosRequestConfig, options: ApiRequestOptions = {type: "public"}) {
  const axiosInstance = options.type == "public" ? axiosPublic : axiosPrivate;

    try {
      const response = await axiosInstance<R>(config);
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

// export class ApiService {
//   private async makeRequest<R>(
//     type: "public" | "private",
//     config: AxiosRequestConfig
//   ) {
//     const axiosInstance = type == "public" ? axiosPublic : axiosPrivate;

//     try {
//       const response = await axiosInstance<R>(config);
//       return response.data;
//     } catch (error) {
//       logger.error(error, "ApiService");
//       if (axios.isAxiosError<ApiError>(error) && error.response) {
//         const { message, statusCode, code } = error.response.data;
//         throw new ApiException(message, statusCode, code);
//       } else {
//         throw error;
//       }
//     }
//   }

//   public async makePublicRequest<R>(config: AxiosRequestConfig) {
//     return await this.makeRequest<R>("public", config);
//   }

//   public async makePrivateRequest<R>(config: AxiosRequestConfig) {
//     return await this.makeRequest<R>("private", config);
//   }
// }
