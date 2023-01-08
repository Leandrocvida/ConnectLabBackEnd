import { IsNumber, IsString } from 'class-validator';

export class AddressDTO {
  @IsString()
  readonly rua: string;
  @IsString()
  readonly cidade: string;
  @IsNumber()
  readonly numero: string;
  @IsString()
  readonly bairro: number;
  readonly complemento: string | null;
}
