import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MyZodValidationPipe } from './auth/config/custom-zod-validation';
import { HttpExceptionFilter } from './auth/config/http-exception.filter';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/role.guard';
import { CourseEnrollModule } from './course-enroll/course-enroll.module';
import { CoursesAdminModule } from './courses/admin/courses.admin.module';
import { CoursesModule } from './courses/user/courses.module';
import { LearningSessionModule } from './learning-session/learning-session.module';
import { NotebookModule } from './notebook/notebook.module';
import { ReviewSessionModule } from './review-session/review-session.module';
import { SharedModule } from './shared/modules/shared.module';
import { TopicWordModule } from './topic-word/topic-word.module';
import { TopicModule } from './topic/topic.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { UserModule } from './user/user.module';
import { WordModule } from './word/word.module';
import { PremiumModule } from './premium/premium.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
    AuthModule,
    UserModule,
    CoursesAdminModule,
    CoursesModule,
    TopicModule,
    TopicWordModule,
    WordModule,
    CourseEnrollModule,
    LearningSessionModule,
    NotebookModule,
    ReviewSessionModule,
    UserProfileModule,
    AdminModule,
    PremiumModule,
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
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
