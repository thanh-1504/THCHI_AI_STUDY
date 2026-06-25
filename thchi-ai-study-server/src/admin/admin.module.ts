import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepo } from './repos/admin.repo';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminRepo],
})
export class AdminModule {}
