import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],

  controllers: [UsersController],

  exports: [],
})
export class UserModule {}
