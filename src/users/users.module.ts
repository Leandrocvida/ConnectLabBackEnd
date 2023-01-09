import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { userProvider } from './users.provider';

@Module({
  controllers: [UsersController],
  providers: [
    ...databaseProviders,
    ...userProvider,
    UsersService]
})
export class UsersModule {}
