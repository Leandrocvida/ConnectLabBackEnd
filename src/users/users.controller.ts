import { Controller, Get, Post, Body, Patch, Param, Delete,  HttpException, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneUserDTO } from './dto/find-one-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Get(':id')
  async findOne(@Param() params: FindOneUserDTO, @Res() response: Response): Promise<UserEntity> {
    try {
        const founded = await this.usersService.findOne(params);
        if (founded) {
            response.status(HttpStatus.OK).send(founded)
            return founded;
        }
        response.status(HttpStatus.OK).send(`Nenhum usuário encontrado com o ID ${params.id}`)
        // throw new HttpException('Nenhum usuário encontrado com o ID', HttpStatus.OK)   

    } catch (err) {
        throw new HttpException({ reason: err?.detail }, HttpStatus.BAD_REQUEST)
    }
}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
