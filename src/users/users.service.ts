import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneUserDTO } from './dto/find-one-user.dto';
import { UpdatePasswordDTO } from './dto/updatePassword.dto';
import { UserAddressEntity } from './entities/address.entity';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    newUser.userName = createUserDto.userName;
    newUser.photoURL = createUserDto.photoURL;
    newUser.email = createUserDto.email;
    newUser.phone = createUserDto.phone;
    newUser.salt = await bcrypt.genSalt(12);
    newUser.password = await bcrypt.hash(createUserDto.password,  newUser.salt);
    newUser.userAddress = new UserAddressEntity();
    newUser.userAddress.CEP = createUserDto.userAddress.CEP;
    newUser.userAddress.street = createUserDto.userAddress.street;
    newUser.userAddress.city = createUserDto.userAddress.city;
    newUser.userAddress.number = createUserDto.userAddress.number;
    newUser.userAddress.neighborhood = createUserDto.userAddress.neighborhood;
    newUser.userAddress.state = createUserDto.userAddress.state;
    newUser.userAddress.complemento = createUserDto.userAddress.complemento;
 

    return new Promise(async (resolve, reject) => {
      try{
        const response = await this.userRepository.save(newUser);
        resolve(response);
      }
      catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }


  async findOne(param: FindOneUserDTO): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
        try {
            const found = await this.userRepository.findOne({
                where: param
            })
            resolve(found)
        } catch (error) {
            reject(error)
        }
    })
}
 

  async update(param: UpdatePasswordDTO, idlogged: number): Promise<boolean> {
    const userToUpdate = await this.userRepository.findOne({
      where: {
          id: idlogged
      }
  })
  if (userToUpdate=== null) {
    throw new HttpException('usuário não encontrado', HttpStatus.BAD_REQUEST)
  }

const passwordTocCheck = await bcrypt.hash(param.oldPassword ,  userToUpdate.salt);
if (userToUpdate.password != passwordTocCheck) {
  throw new HttpException('senha inválida', HttpStatus.BAD_REQUEST)
}

const passwordToUpdate = await bcrypt.hash(param.newPassword,  userToUpdate.salt);

  
    return new Promise(async (resolve, reject) => {
      try {
        const response =  await this.userRepository.update({ id: idlogged },{password: passwordToUpdate });
        const { affected } = response;
        if (affected === 0) {
            reject({
                code: 20000,
                detail: 'Este ID não está presente no banco de dados ou não foi possível atualizar.'
            })
        }
        resolve(true)
      } catch (error) {
        reject(error);
      }
    });
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
