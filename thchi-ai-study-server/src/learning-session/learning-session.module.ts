import { Module } from '@nestjs/common';
import { LearningSessionService } from './learning-session.service';
import { LearningSessionController } from './learning-session.controller';
import { LearningSessionRepo } from './repos/learning-session.repo';

@Module({
  controllers: [LearningSessionController],
  providers: [LearningSessionService,LearningSessionRepo],
})
export class LearningSessionModule {}
