import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

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

  @Get(':id_dispositivo')
  async obterDispositivo(
    @Param() buscarDispositivo: BuscarDispositivoDTO,
  ): Promise<DispositivoEntity> {
    try {
      const dispositivo = await this.dispositivoService.findOne(
        buscarDispositivo,
      );

      const novoDispositivo = new DispositivoEntity();
      novoDispositivo.nome = dispositivo.nome;
      novoDispositivo.tipo = dispositivo.tipo;
      novoDispositivo.fabricante = dispositivo.fabricante;
      novoDispositivo.estado = dispositivo.estado;
      novoDispositivo.ip_dispositivo = dispositivo.ip_dispositivo;
      novoDispositivo.endereco_mac = dispositivo.endereco_mac;

      return novoDispositivo;
    } catch (error) {
      throw new HttpException(
        { reason: error?.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
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
