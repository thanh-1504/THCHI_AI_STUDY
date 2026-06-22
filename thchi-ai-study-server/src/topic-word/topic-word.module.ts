import { Module } from '@nestjs/common';
import { WordRepo } from 'src/word/repos/word.repo';
import { TopicWordRepo } from './repos/topic-word.repo';
import { TopicWordController } from './topic-word.controller';
import { TopicWordService } from './topic-word.service';

@Module({
  controllers: [TopicWordController],
  providers: [TopicWordService, TopicWordRepo, WordRepo],
})
export class TopicWordModule {}
