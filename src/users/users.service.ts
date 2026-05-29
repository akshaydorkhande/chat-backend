import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){

    }

    async createUser(email: string , password: string){
        return this.prisma.user.create({
            data:{
                email,
                password
            },
        });
    }

    findUserByEmail(email:string){
        return this.prisma.user.findUnique({
            where: {email},
        });
    }
}
