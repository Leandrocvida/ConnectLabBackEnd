import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  Query,
  Get,
  Request,
} from '@nestjs/common';
import { BindingService } from './binding.service';
import { BindDeviceDTO } from './dto/bindDevice.dto';
import { Response } from 'express';
import { HttpException } from '@nestjs/common/exceptions';
import { BindingEntity } from './entities/binding.entity';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';

@Controller('binding')
export class BindingController {
  constructor(private readonly bindingService: BindingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createBindingDto: BindDeviceDTO,
    @Res() response: Response,
    @Request() req,
  ) {
    createBindingDto.user = req.user.id;
    try {
      const dispositivoAdicionado =
        await this.bindingService.vincularDispositivo(createBindingDto);
      if (dispositivoAdicionado) {
        return response
          .status(HttpStatus.OK)
          .send('Dispositivo vinculado com sucesso');
      }
    } catch (err) {
      if (err.code == 23505)
        throw new HttpException({ reason: err.detail }, HttpStatus.CONFLICT);
      throw new HttpException({ reason: err }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async obterListaDispositivosUsuario(
    @Query() params,
    @Request() req,
    @Res() response: Response,
  ): Promise<BindingEntity[]> {
    try {
      const devices = await this.bindingService.findBy(req.user.id, params);
      if (devices) {
        response.status(HttpStatus.OK).send(devices);
        return devices;
      }
    } catch (error) {
      throw new HttpException({ reason: error.detail }, HttpStatus.BAD_REQUEST);
    }
  }
}
