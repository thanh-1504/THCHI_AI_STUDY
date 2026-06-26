import { Injectable, NotFoundException } from '@nestjs/common';
import { PremiumDuration } from 'generated/prisma/enums';
import { PremiumRepo } from './repos/premium.repo';
import {
  CreatePremiumPlanType,
  UpdatePremiumPlanType,
} from './schemas/premium.schema';

@Injectable()
export class PremiumService {
  constructor(private readonly premiumRepo: PremiumRepo) {}

  async getAllPlans() {
    return await this.premiumRepo.getAllPlans();
  }

  async createPremiumPlan(payload: CreatePremiumPlanType) {
    let generatedName = '';
    switch (payload.duration) {
      case PremiumDuration.ONE_MONTH:
        generatedName = 'Gói 1 tháng';
        break;
      case PremiumDuration.THREE_MONTHS:
        generatedName = 'Gói 3 tháng';
        break;
      case PremiumDuration.ONE_YEAR:
        generatedName = 'Gói 1 năm';
        break;
    }
    return await this.premiumRepo.createPremiumPlan(generatedName, payload);
  }

  async updatePremiumPlan(id: string, payload: UpdatePremiumPlanType) {
    const existPremium = await this.premiumRepo.findOne(id);
    if (!existPremium)
      throw new NotFoundException('Không tìm thấy gói premim này');
    return await this.premiumRepo.updatePremiumPlan(id, payload);
  }

  async deletePremiumPlan(id: string) {
    const existPremium = await this.premiumRepo.findOne(id);
    if (!existPremium)
      throw new NotFoundException('Không tìm thấy gói premim này');
    return await this.premiumRepo.deletePremiumPlan(id);
  }
}
