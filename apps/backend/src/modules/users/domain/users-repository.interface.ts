import { Relation } from '../infrastructure';
import { User } from './user.entity';

export const USERS_REPO = Symbol('USERS_REPO');

export interface IUsersRepository {
  create(entity: User): Promise<User>;

  findById(id: string, relations?: Relation[]): Promise<User>;

  findByUsername(username: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  getSuggested(userId: string): Promise<User[]>;

  search(query: string, currentId: string): Promise<User[]>;

  flush(): Promise<void>;
}
