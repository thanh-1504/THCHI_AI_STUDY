import { Injectable } from '@nestjs/common';
import { TransactionStatus } from 'generated/prisma/enums';
import { PrismaService } from 'src/shared/services/prisma.service';
import { CreateTransactionType } from '../schemas/transaction.schema';

@Injectable()
export class TransactionRepo {
  constructor(private readonly prisma: PrismaService) {}

  findOne(id: string) {
    return this.prisma.transaction.findUnique({ where: { id } });
  }

  create(userId: string, payload: CreateTransactionType) {
    return this.prisma.transaction.create({
      data: {
        userId,
        planId: payload.planId,
        amount: payload.amount,
        paymentGateway: payload.paymentGateway,
      },
    });
  }

  updateStatus(id: string, status: TransactionStatus) {
    return this.prisma.transaction.update({
      where: { id },
      data: { status },
    });
  }

  update(payload: {
    userId: string;
    id: string;
    status: TransactionStatus;
    endDate: Date;
    startDate: Date;
  }) {
    const { userId, id, status, endDate, startDate } = payload;
    return this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.update({
        where: { id },
        data: { status },
      });
      await tx.subscription.upsert({
        where: { userId },
        create: {
          userId,
          planId: transaction.planId,
          startDate,
          endDate,
          isActive: true,
        },
        update: {
          planId: transaction?.planId,
          startDate,
          endDate,
          isActive: true,
        },
      });
      return transaction;
    });
  }
}
