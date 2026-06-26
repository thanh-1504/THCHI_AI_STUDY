import { Injectable, NotFoundException } from '@nestjs/common';
import { PremiumDuration, TransactionStatus } from 'generated/prisma/enums';
import { PremiumRepo } from 'src/premium/repos/premium.repo';
import { TransactionRepo } from './repo/transaction.repo';
import { CreateTransactionType } from './schemas/transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepo: TransactionRepo,
    private readonly premiumRepo: PremiumRepo,
  ) {}
  async create(userId: string, createTransactionDto: CreateTransactionType) {
    return await this.transactionRepo.create(userId, createTransactionDto);
  }

  async update(payload: {
    id: string;
    payDate: Date;
    status: TransactionStatus;
  }) {
    const transaction = await this.transactionRepo.findOne(payload.id);
    if (!transaction) throw new NotFoundException('Không tìm thấy giao dịch');

    if (payload.status === TransactionStatus.FAILED) {
      return await this.transactionRepo.updateStatus(
        payload.id,
        TransactionStatus.FAILED,
      );
    }
    const planSubscription = await this.premiumRepo.findOne(transaction.planId);
    if (!planSubscription)
      throw new NotFoundException('Không tìm thấy gói premium này');
    let endDate;
    switch (planSubscription.duration) {
      case PremiumDuration.ONE_MONTH:
        endDate = new Date(
          payload.payDate.getTime() + 1000 * 60 * 60 * 24 * 30,
        );
        break;
      case PremiumDuration.THREE_MONTHS:
        endDate = new Date(
          payload.payDate.getTime() + 1000 * 60 * 60 * 24 * 90,
        );
        break;
      case PremiumDuration.ONE_YEAR:
        endDate = new Date(
          payload.payDate.getTime() + 1000 * 60 * 60 * 24 * 365,
        );
        break;
    }

    return await this.transactionRepo.update({
      userId: transaction.userId,
      id: payload.id,
      startDate: payload.payDate,
      endDate,
      status: payload.status,
    });
  }
}
