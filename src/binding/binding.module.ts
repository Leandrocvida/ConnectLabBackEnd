import { Module } from '@nestjs/common';
import { BindingService } from './binding.service';
import { BindingController } from './binding.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { bindingProvider } from './binding.provider';

@Module({
  controllers: [BindingController],
  providers: [...databaseProviders, ...bindingProvider, BindingService]
})
export class BindingModule {}
