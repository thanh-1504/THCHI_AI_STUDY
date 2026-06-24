import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicWordType } from './dto/create-topic-word.dto';
import { UpdateTopicWordType } from './dto/update-topic-word.dto';
import { TopicWordRepo } from './repos/topic-word.repo';
import { TopicIncludeWordSchema } from './schemas/topic-word.schema';

@Injectable()
export class TopicWordService {
  constructor(private readonly topicWordRepo: TopicWordRepo) {}

  async create(topicId: string, createTopicWordDto: CreateTopicWordType) {
    return await this.topicWordRepo.create(topicId, createTopicWordDto);
  }

  async findTopicIncludeWords(topicId: string) {
    const result = await this.topicWordRepo.findTopicIncludeWords(topicId);
    if (!result) throw new NotFoundException();
    const parsed = TopicIncludeWordSchema.safeParse(result);
    if (!parsed.success) {
      console.error(parsed.error);
    }
    return parsed.data;
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
