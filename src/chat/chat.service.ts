import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService){}

    async createChat(userId:number){
        return this.prisma.chat.create({
            data:{
                userId
            },
        });
    }

    async sendMessage(userId: number, chatId: number, content: string) {
        return this.prisma.message.create({
            data: {
            content,
            chatId,
            userId,
            },
        });
    }

    async getUserChats(userId: number){
        return this.prisma.chat.findMany({
            where: {userId},
            orderBy: {createdAt: 'desc'}
        })
    }

    async getMessages(chatId : number){
        return this.prisma.message.findMany({
            where : { chatId },
            orderBy : {createdAt : 'asc'}
        })
    }

}
