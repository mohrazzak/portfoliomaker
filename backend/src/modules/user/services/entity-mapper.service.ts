import { Injectable } from '@nestjs/common';
import { UserModel } from '../models';
import { UserEntity } from '../entity';

@Injectable()
export class UserEntityMapper {
  modelToEntity(user: UserModel): UserEntity {
    return UserEntity.zodSchema.parse(user);
  }
}
