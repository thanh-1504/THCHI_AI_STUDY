import { Module } from '@nestjs/common';
import { OauthRepo } from './repos/oauth.repo';
import { UserRepository } from './repos/user.repo';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, OauthRepo],
})
export class UserModule {}
