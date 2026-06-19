import { Global, Module } from '@nestjs/common';
import { HashingService } from '../services/hashing.service';
import { PrismaService } from '../services/prisma.service';
import { MailModule } from './mail.module';
import { OtpModule } from './otp.module';

@Global()
@Module({
  imports: [MailModule, OtpModule],
  providers: [PrismaService, HashingService],
  exports: [PrismaService, HashingService],
})
export class SharedModule {}
