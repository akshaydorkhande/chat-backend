import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService){}

    @UseGuards(AuthGuard('jwt'))

    @Post()
    createChat(@Req() req){
        return this.chatService.createChat(req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('message')
    sendMessage(@Req() req, @Body() body: { chatId: number; content: string }) {
        return this.chatService.sendMessage(
            req.user.userId,
            body.chatId,
            body.content,
        );
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getUserChats(@Req() req){
        console.log("this is the req--->", req)
        return this.chatService.getUserChats(req)
    }

    @Get(':id/messages')
    @UseGuards(AuthGuard('jwt'))
    getMessages(@Param('id')id:string){
        return this.chatService.getMessages(Number(id))
    }
}
