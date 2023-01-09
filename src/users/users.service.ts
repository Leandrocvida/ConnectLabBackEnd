import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AddressDTO } from './dto/address.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAddressEntity } from './entities/address.entity';
import { UserEntity } from './entities/user.entity';

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
    newUser.password = createUserDto.password;
    newUser.phone = createUserDto.phone;
    newUser.salt = "TODO"
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
        console.log('-- insert error --');
        console.log(error);
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }


 
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
