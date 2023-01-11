import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { databaseProviders } from 'src/core/database/database.providers';
import { userProvider } from 'src/users/users.provider';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';



@Module({
    imports: [
      JwtModule.register({
        secret: 'abcdefghijklmnopqrstuvwxyz',
        signOptions: {
          expiresIn: 60
        }
      })
    ],
    controllers: [AuthController],
    providers: [
      ...databaseProviders,
      ...userProvider,
      AuthService    
    ]
  })

  export class AuthModule {}