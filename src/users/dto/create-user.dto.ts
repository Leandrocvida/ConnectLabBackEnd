import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNumberString,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Match } from 'src/core/constraints/match.decorator';
import { AddressDTO } from './address.dto';
// TODOinserir mensagens
export class CreateUserDto {
  @IsString()
  @MinLength(3 ,{message: 'Username must have at least 3 characters' })
  @MaxLength(50, { message: 'Username cannot have more than 50 characters' })
  UserName: string;

  @IsString()
  @IsUrl({},{ message: 'Please inform a valid URL' })
  photoURL: string;

  @IsString()
  @MaxLength(45,{ message: 'Maximum email lengh allowed is 45 characters' })
  @IsEmail(undefined, { message: 'Please inform a valid email' })
  email: string;

  @IsString()
  @MinLength(6, {message: 'Password must have at least 6 characters' })
  @MaxLength(20, { message: 'Password cannot have more than 20 characters' })
  password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Match('password')
  passwordConfirmation: string;

  @IsString()
  @IsNumberString()
  @MinLength(8)
  @MaxLength(14)
  phone: string;

  
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AddressDTO)
  UserAddress: AddressDTO;
}
