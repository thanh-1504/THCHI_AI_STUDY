import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { CreateTopicType } from '../dto/create-topic.dto';
import { PaginationQueryType } from '../dto/pagination.dto';
import { UpdateTopicType } from '../dto/update-topic.dto';

@Injectable()
export class TopicRepo {
  constructor(private readonly prisma: PrismaService) {}

  findOne(id: string) {
    return this.prisma.topic.findUnique({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        topicWords: {
          include: {
            word: true,
          },
        },
      },
    });
  }

  findAll(pagnitaionQuery: PaginationQueryType) {
    const { page, limit, courseId } = pagnitaionQuery;
    const skip = (page - 1) * limit;
    const take = limit;
    return this.prisma.$transaction([
      this.prisma.topic.count({
        where: {
          deletedAt: null,
        },
      }),
      this.prisma.topic.findMany({
        where: { courseId, deletedAt: null },
        skip,
        take,
        orderBy: {
          orderIndex: 'asc',
        },
      }),
    ]);
  }

  findAllByCourse(courseId: string) {
    return this.prisma.topic.findMany({
      where: {
        courseId,
        deletedAt: null,
      },
    });
  }

  findByCourseAndOrderIndex({
    courseId,
    orderIndex,
  }: {
    courseId: string;
    orderIndex: number;
  }) {
    return this.prisma.topic.findFirst({
      where: {
        courseId,
        orderIndex,
        deletedAt: null,
      },
    });
  }

  create(createTopicDto: CreateTopicType) {
    return this.prisma.topic.create({
      data: createTopicDto,
    });
  }

  update(id: string, updateTopicDto: UpdateTopicType) {
    return this.prisma.topic.update({
      where: {
        id,
        deletedAt: null,
      },
      data: updateTopicDto,
    });
  }

  remove(id: string) {
    return this.prisma.topic.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
