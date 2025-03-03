import { FileExpress, UploadType } from './common';

export const FILE_UPLOADER = Symbol('FILE_UPLOADER');

export interface IUploader {
  uploadFile(file: FileExpress, type: UploadType): Promise<string>;
  deleteFile(filePath: string): Promise<void>;
}
