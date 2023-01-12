import { Controller, Get, Post, Body, Patch, Param, Delete,  HttpException, HttpStatus, Res, UnprocessableEntityException, Put, Request } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDTO } from './dto/updatePassword.dto';
import { FindOneUserDTO } from './dto/find-one-user.dto';
import { UserEntity } from './entities/user.entity';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
 async create(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem.')
  }
const userResponse = await this.usersService.create(createUserDto);
delete userResponse.password
delete userResponse.salt
    return userResponse
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

@UseGuards(JwtAuthGuard)
@Put()
async updatePassword (@Body() updatePassword: UpdatePasswordDTO, @Request() req, @Res() response: Response) : Promise<Response> {
    const usuario = await this.usersService.update(updatePassword, req.user.id);
  if (usuario) {
    return response
    .status(HttpStatus.OK)
    .send('Senha alterada com sucesso');
  }
      
}


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
