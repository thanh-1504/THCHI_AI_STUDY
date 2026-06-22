import { Module } from '@nestjs/common';
import { CourseRepo } from '../repos/course.repo';
import { CoursesAdminService } from './courses.amin.service';
import { CoursesAdminController } from './courses.admin.controller';

@Module({
  controllers: [CoursesAdminController],
  providers: [CoursesAdminService, CourseRepo],
})
export class CoursesAdminModule {}
