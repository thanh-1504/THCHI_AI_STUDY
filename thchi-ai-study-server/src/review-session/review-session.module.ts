import { Module } from '@nestjs/common';
import { ReviewSessionRepo } from './repos/review-session.repo';
import { ReviewSessionController } from './review-session.controller';
import { ReviewSessionService } from './review-session.service';

@Module({
  controllers: [ReviewSessionController],
  providers: [ReviewSessionService, ReviewSessionRepo],
})
export class ReviewSessionModule {}
