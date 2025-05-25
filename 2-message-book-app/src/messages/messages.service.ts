import { Injectable } from '@nestjs/common';
import { MessagesRepositories } from './messages.repositories';

@Injectable()
export class MessagesService {
  messagesRepo: MessagesRepositories;

  /* // NOTE: BAD IMPLEMENTATION classes should not create instances of its dependencies on its own, instead should use Inversion of control principle
  constructor() {
    this.messagesRepo = new MessagesRepositories();
  } */

  // NOTE: BETTER: Class receives its dependency of specific type
  constructor(messagesRepo: MessagesRepositories) {
    this.messagesRepo = messagesRepo;
  }

  // Other way of writtig the constructor
  // constructor(public messagesRepo: MessagesRepositories) {}

  findAll() {
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    return this.messagesRepo.create(content);
  }

  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }
}
