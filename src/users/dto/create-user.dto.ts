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
  readonly userName: string;

  @IsString()
  @IsUrl({},{ message: 'Please inform a valid URL' })
  readonly photoURL: string;

  @IsString()
  @MaxLength(45,{ message: 'Maximum email lengh allowed is 45 characters' })
  @IsEmail(undefined, { message: 'Please inform a valid email' })
  readonly email: string;

  @IsString()
  @MinLength(6, {message: 'Password must have at least 6 characters' })
  @MaxLength(20, { message: 'Password cannot have more than 20 characters' })
  readonly password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Match('password')
  readonly passwordConfirmation: string;

  @IsString()
  @IsNumberString()
  @MinLength(8)
  @MaxLength(14)
  readonly phone: string;

  @ValidateNested({ each: true })
  @Type(() => AddressDTO)
  readonly userAddress: AddressDTO;
}
