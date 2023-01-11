import { Body, Controller, Get, Post, UseGuards, ValidationPipe, Request } from "@nestjs/common";
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CredentialsDTO } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }    



    @Post('/signin')
    async signIn(@Body() credentialsDto: CredentialsDTO
    ) {
        return await this.authService.signIn(credentialsDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    async me(@Request() req) {
      console.log(req)
      return req.user;
    }



}