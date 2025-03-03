import { FileExpress } from 'src/common/types';

export class UpdateCommand {
  constructor(
    public displayName: string,
    public currentId: string,
    public file: FileExpress,
  ) {}
}
