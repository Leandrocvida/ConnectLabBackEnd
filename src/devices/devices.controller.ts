import { Controller, Get, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { DevicesService } from './devices.service';

import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  
  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
   try {
    return this.devicesService.findOne(+id);
   } catch (error) {
    throw new HttpException(
      { reason: error?.detail },
      HttpStatus.BAD_REQUEST,
    );
  }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(+id, updateDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.remove(+id);
  }
}
