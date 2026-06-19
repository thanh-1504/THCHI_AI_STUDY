import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { ZodSerializerDto } from 'nestjs-zod';
import { Public } from 'src/shared/decorators/public.decorator';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDTO,
  LoginDTO,
  LoginResponseDTO,
  RefreshTokenDTO,
  RegisterDTO,
  ResetPasswordDTO,
  VerifyOtpDTO,
} from './dto/auth.dto';
import { GoogleOauthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('/register')
  register(@Body() registerDto: RegisterDTO) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(LoginResponseDTO)
  login(@Body() loginDTO: LoginDTO, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(loginDTO, res);
  }

  @Public()
  @Post('/refresh-token')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Body() refreshTokenDto: RefreshTokenDTO) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/verify-otp')
  async verifyOtp(
    @Body() verifyOtpDto: VerifyOtpDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.verifyOTP(verifyOtpDto);
    if ('accessToken' in result) {
      res.cookie('accessToken', result.accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000,
      });
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 * 1000,
      });
      return { message: 'Xác thực tài khoản thành công' };
    } else {
      return {
        message: 'Xác thực mã OTP thành công',
        resetToken: result.token,
      };
    }
  }

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('google')
  googleLogin() {}

  @Public()
  @Post('/forgot-password')
  forgotPassword(@Body() forgotPasswordDTO: ForgotPasswordDTO) {
    return this.authService.forgotPassword(forgotPasswordDTO);
  }

  @Public()
  @Post('/reset-password')
  resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
    return this.authService.resetPassword(resetPasswordDTO);
  }

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('google-callback')
  googleAuthCallback(@Req() req: any, @Res() res: any) {
    const { accessToken, refreshToken } = req.user;
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 * 1000,
    });
    res.redirect(`http://localhost:5173/review`);
  }
}
