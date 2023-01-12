import { Injectable, Inject } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { BindDeviceDTO } from './dto/bindDevice.dto';
import { BindingEntity } from './entities/binding.entity';

@Injectable()
export class BindingService {
  
  constructor(
    @Inject('BINDING_REPOSITORY')
    private bindingRepository: Repository<BindingEntity>
  ) {}

  async vincularDispositivo(param: BindDeviceDTO): Promise<BindingEntity> {
    return new Promise(async (resolve, reject) => {
      const entidade : BindingEntity = ({
        ...param,id_devices_user: 0
    });
      try {
        const response = await this.bindingRepository.save(entidade);
        resolve(response);
      } catch (error) {
                reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async findBy(LoggedUserId, param?): Promise<BindingEntity[]> {
    return new Promise(async (resolve, reject) => {
      const user = new UserEntity();
      user.id = LoggedUserId;
      try {
        if (param) {
          resolve(
            await this.bindingRepository.findBy({ local: param.local, user: LoggedUserId }),
          );
        }
        resolve(
          await this.bindingRepository.findBy({user: LoggedUserId }),
        );
      } catch (error) {
        reject(error);
      }
    });
  }
  findAll() {
    return `This action returns all binding`;
  }

  findOne(id: number) {
    return `This action returns a #${id} binding`;
  }


  remove(id: number) {
    return `This action removes a #${id} binding`;
  }
}
