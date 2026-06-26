import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionRepo } from './repo/transaction.repo';
import { PremiumRepo } from 'src/premium/repos/premium.repo';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService,TransactionRepo,PremiumRepo],
})
export class TransactionModule {}
