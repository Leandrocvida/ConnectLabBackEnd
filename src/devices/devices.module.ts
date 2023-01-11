import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { deviceProvider } from './device.provider';

@Module({
  controllers: [DevicesController],
  providers: [...databaseProviders, ...deviceProvider, DevicesService]
})
export class DevicesModule {}
