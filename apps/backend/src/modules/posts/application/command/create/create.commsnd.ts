import { FileExpress } from 'src/common/types';

export class CreateCommand {
  constructor(
    public currentId: string,
    public file: FileExpress,
    public caption?: string,
  ) {}
}
