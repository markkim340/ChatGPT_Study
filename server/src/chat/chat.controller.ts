import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { SentenceDto } from './dto/sentence.dto';

@Controller('api')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/chatgpt')
  async requestToChatGpt(@Body() sentenceDto: SentenceDto) {
    return await this.chatService.requestToChatGpt(sentenceDto);
  }
}
