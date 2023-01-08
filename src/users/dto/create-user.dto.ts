import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNumberString,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/core/constraints/match.decorator';
import { AddressDTO } from './address.dto';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @IsUrl()
  photoURL: string;

  @IsString()
  @MaxLength(30)
  @IsEmail(undefined, { message: 'O e-mail informado não é válido' })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
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
  // @Type(() => AddressDTO) TODO porque isso não funciona
  address: AddressDTO;
}
