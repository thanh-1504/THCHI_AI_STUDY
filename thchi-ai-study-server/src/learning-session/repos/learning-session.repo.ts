import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import {
  CompleteLearningSessionType,
  CreateLearningLogType,
} from '../schemas/learning-session.schema';

@Injectable()
export class LearningSessionRepo {
  constructor(private readonly prismaService: PrismaService) {}
  createLearningSession(userId: string, topicId: string) {
    const learningSession = this.prismaService.learningSession.create({
      data: {
        userId: userId,
        topicId: topicId,
      },
    });
    return learningSession;
  }

  createLearningSessionLog(userId: string, payload: CreateLearningLogType) {
    const learningSessionLog = this.prismaService.learningLog.create({
      data: {
        userId,
        learningSessionId: payload.learningSessionId,
        wordId: payload.wordId,
        step: payload.step,
        isCorrect: payload.isCorrect,
        attemptCount: payload.attemptCount,
      },
    });
    return learningSessionLog;
  }

  updateLearningSession(
    userId: string,
    learningSessionId: string,
    payload: CompleteLearningSessionType,
  ) {
    return this.prismaService.$transaction(async (tx) => {
      const session = await tx.learningSession.update({
        where: {
          id: learningSessionId,
          userId,
        },
        data: {
          completedAt: new Date(),
          wordsCount: payload.wordsCount,
          xpEarned: payload.xpEarned,
        },
        include: {
          topic: {
            include: {
              topicWords: true,
            },
          },
        },
      });
      let notebook = await tx.notebook.findUnique({
        where: { userId },
      });
      if (!notebook) {
        notebook = await tx.notebook.create({
          data: {
            userId,
          },
        });
      }
      for (const word of session.topic.topicWords) {
        await tx.notebookEntry.upsert({
          where: {
            notebookId_wordId: {
              notebookId: notebook.id,
              wordId: word.id,
            },
          },
          create: {
            notebookId: notebook.id,
            wordId: word.id,
          },
          update: {},
        });
      }
      return session;
    });
  }

  findOne(id: string) {
    return this.prismaService.learningSession.findUnique({
      where: {
        id,
      },
    });
  }
}
