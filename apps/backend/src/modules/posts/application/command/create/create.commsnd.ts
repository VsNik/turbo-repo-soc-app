import { FileExpress } from 'src/common/types';
import { User } from 'src/modules/users/domain';

export class CreateCommand {
  constructor(
    public currentUser: User,
    public file: FileExpress,
    public caption?: string,
  ) {}
}
