import { EntityDTO } from '@mikro-orm/core';
import { User } from '../domain';

export type Relation = 'followers' | 'following' | 'favorites';

export interface IUser extends EntityDTO<User> {
  isFollow?: boolean;
}
