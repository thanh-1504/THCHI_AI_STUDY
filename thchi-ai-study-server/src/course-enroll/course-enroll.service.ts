import { BadRequestException, Injectable } from '@nestjs/common';
import { CourseEnrollRepo } from './repos/course-enroll.repo';
import { CreateCourseEnrollType } from './schemas/course-enroll.schema';

@Injectable()
export class CourseEnrollService {
  constructor(private readonly courseEnrollRepo: CourseEnrollRepo) {}
  async create(createCourseEnrollDto: CreateCourseEnrollType, userId: string) {
    const isEnrolled = await this.courseEnrollRepo.findOne(
      userId,
      createCourseEnrollDto.courseId,
    );
    if (isEnrolled)
      throw new BadRequestException('Bạn đã tham gia khóa học này');
    return await this.courseEnrollRepo.create(createCourseEnrollDto, userId);
  }

  async findAll(userId: string) {
    return await this.courseEnrollRepo.findAll(userId);
  }
}
