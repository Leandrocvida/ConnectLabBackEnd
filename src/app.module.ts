import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DevicesModule } from './devices/devices.module';
import { BindingModule } from './binding/binding.module';
import { AuthController } from './core/auth/auth.controller';
import { databaseProviders } from './core/database/database.providers';
import { userProvider } from './users/users.provider';
import { AuthService } from './core/auth/auth.service';
import { JwtStrategy } from './core/auth/guards/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      secret: 'jb2KURr1O89JjfcvCPIZkh3qQQ',
      signOptions: {
        expiresIn: 60 * 6,
      },
    }),
    UsersModule,
    DevicesModule,
    BindingModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    ...databaseProviders,
    ...userProvider,
    AppService,
    AuthService,
    JwtStrategy,
  ],
})
export class AppModule {}
