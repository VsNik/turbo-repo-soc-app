import { randomUUID } from 'crypto';
import { FileExpress, UploadType } from '../types';
import { IUploader } from '../types/uploader.interface';
import { extension } from 'mime-types';
import { path } from 'app-root-path';
import { ensureDir, remove, writeFile } from 'fs-extra';
import * as dayjs from 'dayjs';

export class FsUploader implements IUploader {
  async uploadFile(file: FileExpress, type: UploadType) {
    if (!file) {
      return;
    }

    const [year, month] = dayjs().format('YYYY MM').split(' ');
    const uploadDirectory = process.env.UPLOAD_DIR;
    const subDirectory = `${type}/${year}/${month}`;

    const uuid = randomUUID();
    const fileExtension = extension(file.mimetype);
    const hashName = `${uuid}.${fileExtension}`;

    const uploadDirectoryPath = `${path}/${uploadDirectory}/${subDirectory}`;
    const destinationFile = `${uploadDirectoryPath}/${hashName}`;

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, Buffer.from(file.buffer));
    return `${subDirectory}/${hashName}`;
    // return getUploadPath(`${subDirectory}/${hashName}`);
  }

  async deleteFile(filePath: string) {
    if (!path) {
      return;
    }

    await remove(`${process.env.UPLOAD_DIR}/${filePath}`);
    // await remove(`${this.configService.get('UPLOAD_DIR')}/${filePath}`);
  }
}
