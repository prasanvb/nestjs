import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepositories {
  async findAll() {
    const contents = await readFile('src/data.json', 'utf8');
    const messages = JSON.parse(contents) as { [key: string]: object };

    return messages;
  }

  async create(content: string) {
    const contents = await readFile('src/data.json', 'utf8');
    const messages = JSON.parse(contents) as { [key: string]: object };

    const id = Math.floor(Math.random() * 999);

    messages[id] = { id, content };

    await writeFile('src/data.json', JSON.stringify(messages));
  }

  async findOne(id: string) {
    const contents = await readFile('src/data.json', 'utf8');
    const messages = JSON.parse(contents) as { [key: string]: object };

    return messages[id];
  }
}
