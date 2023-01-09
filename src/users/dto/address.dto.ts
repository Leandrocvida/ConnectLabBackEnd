import { IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';
// TODO inserir as mensagens
export class AddressDTO {
  
  @IsNotEmpty()
  // @IsString()
  // @IsNumberString({ message: 'Cep must be a number' })
  // @Length(8,10)
  readonly CEP: string;
 
  @IsNotEmpty()
  @IsString()
  readonly street: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsNumberString()
  readonly number:string;

  @IsNotEmpty()
  @IsString()
  readonly neighborhood: string;

  @IsNotEmpty()
  @IsString()
  readonly state: string;
  
  @IsString()
  readonly complemento: string | null;
}
