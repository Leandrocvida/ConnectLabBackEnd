import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DevicesModule } from './devices/devices.module';
import { BindingModule } from './binding/binding.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UsersModule,
    DevicesModule,
    BindingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
