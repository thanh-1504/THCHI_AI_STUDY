import { Injectable } from '@nestjs/common';
import { CreateTopicWordType } from './dto/create-topic-word.dto';
import { UpdateTopicWordType } from './dto/update-topic-word.dto';
import { TopicWordRepo } from './repos/topic-word.repo';

@Injectable()
export class TopicWordService {
  constructor(private readonly topicWordRepo: TopicWordRepo) {}

  async create(topicId: string, createTopicWordDto: CreateTopicWordType) {
    return await this.topicWordRepo.create(topicId, createTopicWordDto);
  }

  findAll() {
    return `This action returns all topicWord`;
  }

  async findOne(topicId: string, wordId: string) {
    return await this.topicWordRepo.findOne(topicId, wordId);
  }

  async update(topicId: string, wordId: string, dto: UpdateTopicWordType) {
    return this.topicWordRepo.update(topicId, wordId, dto);
  }

  async remove(topicId: string, wordId: string) {
    return this.topicWordRepo.remove(topicId, wordId);
  }
}
