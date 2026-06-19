import { BadRequestException, Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { OtpType } from 'generated/prisma/enums';
import { OtpRepo } from '../repos/otp.repo';

@Injectable()
export class OtpService {
  constructor(private readonly otpRepo: OtpRepo) {}

  private generateOtp() {
    return randomInt(0, 999999).toString().padStart(6, '0');
  }

  async createOTP(payload: { email: string; type: OtpType }) {
    const code = this.generateOtp();
    const { email, type } = payload;
    await this.otpRepo.createOTP({
      email,
      code,
      type,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    return code;
  }

  async verifyOtp(payload: { email: string; type: OtpType; code: string }) {
    const { email, type, code } = payload;
    const existOtp = await this.otpRepo.findOtpByEmailAndType({ email, type });
    if (!existOtp) throw new BadRequestException('Mã OTP không tồn tại');
    if (existOtp.usedAt)
      throw new BadRequestException('Mã OTP đã được sử dụng');
    if (new Date(existOtp.expiresAt).getTime() < Date.now())
      throw new BadRequestException('Mã OTP đã hết hạn');
    if (existOtp.attempts >= 3)
      throw new BadRequestException('Bạn đã nhập sai OTP quá nhiều lần');
    if (existOtp.code !== code) {
      await this.otpRepo.updateOtp({
        email,
        type,
        attempts: existOtp.attempts + 1,
      });
      throw new BadRequestException('Mã OTP không đúng');
    }
    return true;
  }

  async deleteOtp(payload: { email: string; type: OtpType }) {
    const { email, type } = payload;
    const otp = await this.otpRepo.findOtpByEmailAndType({ email, type });
    if (!otp) throw new BadRequestException('Mã OTP không tồn tại');
    await this.otpRepo.deleteOtp({ email, type });
  }
}
