import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Match } from "src/core/constraints/match.decorator";


export class UpdatePasswordDTO {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly oldPassword: string;


    @MinLength(8)
    @IsNotEmpty()
    readonly newPassword: string;

    @Match('newPassword', {message: 'Senhas não conferem'})
    readonly confirmationPassword: string;


}