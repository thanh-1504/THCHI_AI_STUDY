import { Body, Controller, Post } from '@nestjs/common';
import { CreatePaymentMomoDTO } from './dto/create-payment.schema';
import { MomoService } from './momo.service';

@Controller('momo')
export class MomoController {
  constructor(private readonly momoService: MomoService) {}

  @Post('create-payment')
  createPayment(@Body() body: CreatePaymentMomoDTO) {
    return this.momoService.createPayment(
      body.orderId,
      body.amount,
      body.orderInfo,
    );
  }

  @Post('ipn')
  async handleIpn(@Body() body: any) {
    console.log('Nhận dữ liệu IPN từ MoMo:', body);
    // Xác thực chữ ký để đảm bảo dữ liệu này thực sự từ MoMo gửi tới
    const isValid = this.momoService.verifyIpn(body);
    if (!isValid) {
      console.error('Chữ ký MoMo IPN không hợp lệ!');
      return;
    }
    // Kiểm tra mã kết quả giao dịch
    if (body.resultCode === 0) {
      // resultCode = 0 nghĩa là giao dịch thành công
      console.log(
        `Đơn hàng ${body.orderId} đã thanh toán thành công qua MoMo.`,
      );
      // Thực hiện logic cập nhật DB tại đây (Ví dụ: trạng thái đơn hàng = 'PAID')
    } else {
      console.log(
        `Đơn hàng ${body.orderId} thanh toán thất bại. Mã lỗi: ${body.resultCode}`,
      );
      // Thực hiện logic hủy đơn hàng hoặc ghi nhận lỗi
    }
    return; // Phản hồi lại cho MoMo biết đã nhận xử lý thành công
  }
}
