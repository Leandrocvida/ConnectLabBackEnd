import { Inject, Injectable } from '@nestjs/common';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Repository } from "typeorm";
import { DeviceEntity } from './entities/device.entity';

@Injectable()
export class DevicesService {
 
  constructor(
    @Inject('DEVICE_REPOSITORY')
    private deviceRepository: Repository<DeviceEntity>,
  ) {}

  findAll() {
    return `This action returns all devices`;
  }

  async findOne(id: number): Promise<DeviceEntity>  {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.deviceRepository.findOneBy({ deviceId: id })); //DUV isso funciona assim ou precisa chamar dentro do objeto
      } catch (error) {
        reject(error);
      }
    });
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
