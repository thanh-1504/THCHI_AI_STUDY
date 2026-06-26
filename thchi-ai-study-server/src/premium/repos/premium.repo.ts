import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import {
  CreatePremiumPlanType,
  UpdatePremiumPlanType,
} from '../schemas/premium.schema';

@Injectable()
export class PremiumRepo {
  constructor(private readonly prismaService: PrismaService) {}

  findOne(id: string) {
    return this.prismaService.premiumPlan.findUnique({
      where: { id, deletedAt: null },
    });
  }

  getAllPlans() {
    return this.prismaService.premiumPlan.findMany({
      where: { deletedAt: null },
    });
  }

  createPremiumPlan(name: string, payload: CreatePremiumPlanType) {
    return this.prismaService.premiumPlan.create({
      data: {
        name,
        ...payload,
      },
    });
  }

  updatePremiumPlan(id: string, payload: UpdatePremiumPlanType) {
    return this.prismaService.premiumPlan.update({
      where: { id, deletedAt: null },
      data: payload,
    });
  }

  deletePremiumPlan(id: string) {
    return this.prismaService.premiumPlan.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date(), isActive: false },
    });
  }
}
