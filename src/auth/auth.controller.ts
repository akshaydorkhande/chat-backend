import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService){}

     @Post('signup')
        signup(@Body() body: { email: string; password: string }) {
            return this.authservice.signup(body.email, body.password);
        }


    @Post('login')
    login(@Body() body: {email: string; password: string}){
        return this.authservice.login(body.email, body.password)
    }
}
