import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { access } from 'fs';
@Injectable()
export class AuthService {
    constructor(private userService : UsersService,
        private jwtService : JwtService
    ){}

    //singup

    async signup(email: string, password: string){
        const existingUser = await this.userService.findUserByEmail(email)

        if(existingUser){
            throw new BadRequestException('User Already Exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.userService.createUser(email, hashedPassword)

        return{
            message: 'User Created Successfully',
            user: user.id
        }
    }

    //login
    async login(email:string, password:string){
        const user = await this.userService.findUserByEmail(email);

        if(!user){
            throw new UnauthorizedException('Invalid Credentials')
        }

        const ispasswordValid = await bcrypt.compare(password, user.password);

        if(!ispasswordValid){
            throw new UnauthorizedException('Invalid Credentials')
        }

        const payload = {userId : user.id , email: user.email}

        const token = this.jwtService.sign(payload);

        return{
            access_token: token,
        };
    }
}
