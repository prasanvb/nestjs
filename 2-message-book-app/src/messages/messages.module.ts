import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepositories } from './messages.repositories';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepositories],
})
export class MessagesModule {}
