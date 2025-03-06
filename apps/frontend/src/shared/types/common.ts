export const ACCESS_TOKEN = "access_token";

export type ApiError = {
  statusCode: number;
  error: string;
  message: string;
};

export enum PostType {
  Image = "image",
  Video = "video",
}
