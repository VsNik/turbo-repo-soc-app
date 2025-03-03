export type FileExpress = Express.Multer.File;

export const IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
export const VIDEO_TYPE = ['video/mp4'];
export const DOC_TYPE = [
  'application/pdf',
  'application/msword',
  'text/csv',
  'text/plain',
];

export enum FileType {
  Image = 'image',
  Video = 'video',
  Document = 'document',
}

export enum PostType {
  Image = 'image',
  Video = 'video',
}

export enum UploadType {
  Avatar = 'avatar',
  Post = 'post',
  Chat = 'chat',
}
