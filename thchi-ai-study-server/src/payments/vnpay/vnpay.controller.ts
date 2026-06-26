import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePaymentVnPayDTO } from './dto/create-payment.dto';
import { VNPayService } from './vnpay.service';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('vnpay')
export class VNPayController {
  constructor(private readonly vnpayService: VNPayService) {}

  @Post('create-payment')
  createPaymentUrl(@Body() createPaymentVnPayDTO: CreatePaymentVnPayDTO) {
    return this.vnpayService.createPayment(
      createPaymentVnPayDTO.amount,
      createPaymentVnPayDTO.orderId,
      createPaymentVnPayDTO.orderInfo,
    );
  }

  @Public()
  @Get('verify')
  returnUrl(@Query() query: any) {
    return this.vnpayService.verifyPayment(query);
  }
}
