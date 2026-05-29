import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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

    @Post('message')
    @UseGuards(AuthGuard('jwt'))
    sendMessage(@Req() req, @Body() body: { chatId: number; content: string }) {
        return this.chatService.sendMessage(
            req.user.userId,
            body.chatId,
            body.content,
        );
    }
}
