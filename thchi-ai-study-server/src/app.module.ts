import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MyZodValidationPipe } from './auth/config/custom-zod-validation';
import { HttpExceptionFilter } from './auth/config/http-exception.filter';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CoursesAdminModule } from './courses/admin/courses.admin.module';
import { SharedModule } from './shared/modules/shared.module';
import { TopicWordModule } from './topic-word/topic-word.module';
import { TopicModule } from './topic/topic.module';
import { UserModule } from './user/user.module';
import { WordModule } from './word/word.module';
import { CourseEnrollModule } from './course-enroll/course-enroll.module';
import { LearningSessionModule } from './learning-session/learning-session.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
    AuthModule,
    UserModule,
    CoursesAdminModule,
    TopicModule,
    TopicWordModule,
    WordModule,
    CourseEnrollModule,
    LearningSessionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: MyZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
