import { AxiosError } from "axios";
import { ApiError } from "../types/common";

export const catchError = (error: unknown): ApiError => {
  return error instanceof AxiosError
    ? error.response?.data
    : error instanceof Error
      ? {
          statusCode: 400,
          error: error.message,
          message: error.message,
        }
      : {
          statusCode: 500,
          error: "Internal Server Error",
          message: "Internal Server Error",
        };
};
