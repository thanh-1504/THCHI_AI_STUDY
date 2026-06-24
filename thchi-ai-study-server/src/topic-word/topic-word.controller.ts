import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTopicWordDTO } from './dto/create-topic-word.dto';
import { UpdateTopicWordDto } from './dto/update-topic-word.dto';
import { TopicWordService } from './topic-word.service';

@Controller('topic-word')
export class TopicWordController {
  constructor(private readonly topicWordService: TopicWordService) {}

  @Post('/:topicId/words')
  create(
    @Param('topicId') topicId: string,
    @Body() createTopicWordDto: CreateTopicWordDTO,
  ) {
    return this.topicWordService.create(topicId, createTopicWordDto);
  }

  @Get(':topicId')
  findTopicIncludeWords(@Param('topicId') topicId: string) {
    return this.topicWordService.findTopicIncludeWords(topicId);
  }

  @Get(':topicId/words/:wordId')
  findWordInTopic(
    @Param('topicId') topicId: string,
    @Param('wordId') wordId: string,
  ) {
    return this.topicWordService.findOne(topicId, wordId);
  }

  @Patch(':topicId/words/:wordId')
  update(
    @Param('topicId') topicId: string,
    @Param('wordId') wordId: string,
    @Body() updateTopicWordDto: UpdateTopicWordDto,
  ) {
    return this.topicWordService.update(topicId, wordId, updateTopicWordDto);
  }

  @Delete(':topicId/words/:wordId')
  remove(@Param('topicId') topicId: string, @Param('wordId') wordId: string) {
    return this.topicWordService.remove(topicId, wordId);
  }
}
