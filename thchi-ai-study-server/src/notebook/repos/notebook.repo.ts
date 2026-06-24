import { Injectable } from '@nestjs/common';
import { WordStatus } from 'generated/prisma/enums';
import { PrismaService } from 'src/shared/services/prisma.service';
import { CreateNoteBookType } from '../schemas/notebook.schema';

@Injectable()
export class NoteBookRepo {
  constructor(private readonly prisma: PrismaService) {}

  // getNoteBookByUserId(userId: string) {
  //   return this.prisma.notebookEntry.findMany({
  //     where: { notebook: { userId } },
  //     include: {
  //       word: {
  //         select: {
  //           term: true,
  //           phonetic: true,
  //           audioUrl: true,
  //         },
  //       },
  //     },
  //   });
  // }

  getWordsDue(userId: string) {
    return this.prisma.notebookEntry.findMany({
      where: {
        notebook: { userId },
        nextReviewAt: {
          lte: new Date(),
        },
      },
      include: {
        word: {
          select: {
            term: true,
            phonetic: true,
            audioUrl: true,
            definitions: {
              select: {
                wordType: true,
                meaning: true,
              },
            },
            examples: {
              select: {
                sentence: true,
                translation: true,
                isAiGenerated: true,
              },
            },
          },
        },
      },
      orderBy: {
        nextReviewAt: 'asc',
      },
    });
  }

  findOne(userId: string) {
    return this.prisma.notebook.findUnique({
      where: { userId },
    });
  }

  findWordInNoteBook(userId: string, term: string) {
    return this.prisma.notebookEntry.findFirst({
      where: {
        notebook: { userId },
        word: {
          term: { equals: term, mode: 'insensitive' },
        },
      },
      include: {
        word: {
          select: {
            term: true,
            phonetic: true,
            definitions: {
              select: { wordType: true, meaning: true },
            },
          },
        },
      },
    });
  }

  countWordsActive(notebookId: string) {
    return this.prisma.notebookEntry.count({
      where: { notebookId, status: WordStatus.ACTIVE },
    });
  }

  countWordsSleeping(notebookId: string) {
    return this.prisma.notebookEntry.count({
      where: { notebookId, status: WordStatus.SLEEPING },
    });
  }

  createNoteBook(userId: string, payload: CreateNoteBookType) {
    return this.prisma.notebook.create({
      data: {
        userId,
        ...payload,
      },
    });
  }

  deleteWordInNoteBook(notebookId: string, wordId: string) {
    return this.prisma.notebookEntry.delete({
      where: {
        notebookId_wordId: {
          notebookId,
          wordId,
        },
      },
    });
  }
}
