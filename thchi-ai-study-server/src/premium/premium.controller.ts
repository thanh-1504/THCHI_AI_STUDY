import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { Roles } from 'src/shared/decorators/role.decorator';
import { CreatePremiumPlanDTO } from './dtos/create-premium.dto';
import { UpdatePremiumPlanDTO } from './dtos/update-premium.dto';
import { PremiumService } from './premium.service';

@Roles('ADMIN')
@Controller('premium')
export class PremiumController {
  constructor(private readonly premiumService: PremiumService) {}

  @Get()
  getAllPlans() {
    return this.premiumService.getAllPlans();
  }

  @Post()
  createPremiumPlan(@Body() payload: CreatePremiumPlanDTO) {
    return this.premiumService.createPremiumPlan(payload);
  }

  @Patch('/:id')
  updatePremiumPlan(
    @Param('id') id: string,
    @Body() payload: UpdatePremiumPlanDTO,
  ) {
    return this.premiumService.updatePremiumPlan(id, payload);
  }

  @Patch('/:id')
  deletePremiumPlan(@Param('id') id: string) {
    return this.premiumService.deletePremiumPlan(id);
  }
}
