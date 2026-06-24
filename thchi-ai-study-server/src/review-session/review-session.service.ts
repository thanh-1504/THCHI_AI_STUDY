import { Injectable } from '@nestjs/common';
import { ReviewSessionRepo } from './repos/review-session.repo';
import {
  CompleteReviewSessionType,
  CreateReviewSessionLogType,
} from './schemas/review-session.schema';

@Injectable()
export class ReviewSessionService {
  constructor(private readonly reviewSessionRepo: ReviewSessionRepo) {}

  async getReviewSessionById(id: string) {
    return await this.reviewSessionRepo.getReviewSessionById(id);
  }

  async createReviewSession(userId: string) {
    return await this.reviewSessionRepo.create(userId);
  }

  async createReviewSessionLog(
    userId: string,
    reviewSessionId: string,
    createReviewSessionLog: CreateReviewSessionLogType,
  ) {
    return await this.reviewSessionRepo.createReviewSessionLog(
      userId,
      reviewSessionId,
      createReviewSessionLog,
    );
  }

  async complete(
    userId: string,
    sessionId: string,
    payload: CompleteReviewSessionType,
  ) {
    return await this.reviewSessionRepo.complete(userId, sessionId, payload);
  }
}
