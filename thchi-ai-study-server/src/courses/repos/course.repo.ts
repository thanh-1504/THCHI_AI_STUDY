import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { CreateCourseType } from '../dto/create-course.dto';
import { PaginationQueryType } from '../dto/pagination.dto';
import { UpdateCourseType } from '../dto/update-course.dto';

@Injectable()
export class CourseRepo {
  constructor(private readonly prisma: PrismaService) {}

  findOne(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findOneWithTopic(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        topics: {
          where: { deletedAt: null },
        },
      },
    });
  }

  findByTitle(title: string) {
    return this.prisma.course.findFirst({
      where: {
        title,
        deletedAt: null,
      },
    });
  }

  findAll(pagnitaionQuery: PaginationQueryType) {
    const { page, limit } = pagnitaionQuery;
    const skip = (page - 1) * limit;
    const take = limit;
    return this.prisma.$transaction([
      this.prisma.course.count({
        where: {
          deletedAt: null,
        },
      }),
      this.prisma.course.findMany({
        where: { deletedAt: null },
        skip,
        take,
        orderBy: {
          createdAt: 'asc',
        },
      }),
    ]);
  }

  findCourseForUser() {
    return this.prisma.course.findMany({
      where: { deletedAt: null, isPublished: true },
      select: {
        id: true,
        title: true,
        subtitle: true,
        description: true,
        imageUrl: true,
        topics: {
          where: { deletedAt: null },
          select: {
            id: true,
            courseId: true,
            title: true,
            imageUrl: true,
          },
        },
      },
    });
  }

  createCourse(data: CreateCourseType) {
    return this.prisma.course.create({
      data,
    });
  }

  updateCourse(id: string, data: UpdateCourseType) {
    return this.prisma.course.update({
      where: {
        id,
      },
      data,
    });
  }

  deleteCourse(id: string) {
    return this.prisma.course.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
