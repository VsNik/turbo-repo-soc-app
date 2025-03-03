import { BadRequestException } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { DOC_TYPE, FileType, IMAGE_TYPES, VIDEO_TYPE } from '../types';

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
  });
}

export function setFileUrl(fileUri: string, folder: string = ''): string {
  const patern = /^https:\/\//;

  if (patern.test(fileUri)) {
    return fileUri;
  }

  const staticUrl = process.env.SERVER_HOST;
  const serveRoot = process.env.SERVE_ROOT;

  return folder
    ? `${staticUrl}${serveRoot}/${folder}/${fileUri}`
    : `${staticUrl}${serveRoot}/${fileUri}`;
}

export function detectFileType(file: Express.Multer.File) {
  if (IMAGE_TYPES.includes(file.mimetype)) {
    return FileType.Image;
  }
  if (VIDEO_TYPE.includes(file.mimetype)) {
    return FileType.Video;
  }
  if (DOC_TYPE.includes(file.mimetype)) {
    return FileType.Document;
  }
  throw new BadRequestException('Invalid file type');
}
