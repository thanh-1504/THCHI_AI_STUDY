import { Injectable } from '@nestjs/common';
import { LearningSessionRepo } from './repos/learning-session.repo';
import {
  CompleteLearningSessionType,
  CreateLearningLogType,
} from './schemas/learning-session.schema';

@Injectable()
export class LearningSessionService {
  constructor(private readonly learningSessionRepo: LearningSessionRepo) {}
  async create(userId: string, topicId: string) {
    return await this.learningSessionRepo.createLearningSession(
      userId,
      topicId,
    );
  }

  async createLearningSessionLog(
    learningSessionId: string,
    userId: string,
    createLearningSessionDTO: CreateLearningLogType,
  ) {
    return await this.learningSessionRepo.createLearningSessionLog(
      learningSessionId,
      userId,
      createLearningSessionDTO,
    );
  }

  async updateLearningSession(
    userId: string,
    learningSessionId: string,
    completeLearningSessionDTO: CompleteLearningSessionType,
  ) {
    return await this.learningSessionRepo.updateLearningSession(
      learningSessionId,
      userId,
      completeLearningSessionDTO,
    );
  }

  async findOne(id: string) {
    return await this.learningSessionRepo.findOne(id);
  }
}
