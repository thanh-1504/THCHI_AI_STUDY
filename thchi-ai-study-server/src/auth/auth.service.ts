import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { AccountStatus, AuthProvider, OtpType } from 'generated/prisma/enums';
import { AccessTokenPayload, GoogleUser } from 'src/shared/interfaces/IUser';
import { VerifyOtpType } from 'src/shared/schemas/otp.schema';
import { HashingService } from 'src/shared/services/hashing.service';
import { JWTService } from 'src/shared/services/jwt.service';
import { MailService } from 'src/shared/services/mail.service';
import { OtpService } from 'src/shared/services/otp.service';
import { OauthRepo } from 'src/user/repos/oauth.repo';
import { UserRepository } from 'src/user/repos/user.repo';
import { UserService } from 'src/user/user.service';
import { RefreshTokenDTO } from './dto/auth.dto';
import { ForgotPasswordType } from './schemas/forgot.password.schema';
import type { LoginDto } from './schemas/login.schema';
import type { RegisterDto } from './schemas/register.schema';
import { ResetPasswordType } from './schemas/reset.password.schema';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly oauthRepo: OauthRepo,
    private readonly hashingService: HashingService,
    private readonly jwtService: JWTService,
    private readonly otpService: OtpService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
  ) {}

  async generateTokens(user: AccessTokenPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAccessToken(user),
      this.jwtService.signRefreshToken({ id: user.id }),
    ]);
    return { accessToken, refreshToken };
  }

  async verifyOTP(payload: VerifyOtpType) {
    const { email, type, code } = payload;
    await this.otpService.verifyOtp({
      email,
      type,
      code,
    });
    await this.otpService.deleteOtp({ email, type });
    if (type == OtpType.REGISTER) {
      await this.userRepo.updateUser(
        { email },
        {
          status: AccountStatus.ACTIVE,
        },
      );
      const user = await this.userRepo.findUserByEmail(email);
      if (!user) throw new BadRequestException('Không tìm thấy người dùng');
      return this.generateTokens({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      const token = await this.jwtService.signResetToken({ email });
      return { token };
    }
  }

  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;
    const user = await this.userRepo.findUserByEmail(email);
    if (user) throw new BadRequestException('Email này đã tồn tại rồi bạn ơi');
    await this.userRepo.registerUser({
      name,
      email,
      password: await this.hashingService.hashPassword(password),
    });
    const otp = await this.otpService.createOTP({
      email,
      type: OtpType.REGISTER,
    });
    await this.mailService.sendOTPCodeToEmail(email, otp);
    return { message: 'Vui lòng kiểm tra email để xác thực tài khoản' };
  }

  async login(loginDto: LoginDto, res: Response) {
    const { email, password } = loginDto;
    const user = await this.userRepo.findUserByEmail(email);
    if (!user)
      throw new BadRequestException('Email chưa tồn tại trong hệ thống');

    if (!user.password) {
      throw new BadRequestException(
        'Tài khoản này đăng nhập bằng Google. Vui lòng dùng nút Đăng nhập Google',
      );
    }

    if (user && user.status === AccountStatus.ACTIVE) {
      const correctPassword = await this.hashingService.comparePassword(
        password,
        user.password!,
      );
      if (!correctPassword)
        throw new BadRequestException('Mật khẩu không chính xác');
      const { accessToken, refreshToken } = await this.generateTokens({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
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
      return { message: 'Đăng nhập thành công', accessToken, refreshToken };
    } else {
      throw new BadRequestException(
        'Tài khoản bị khóa hoặc không hoạt động. Vui lòng liên hệ quản trị viên',
      );
    }
  }

  async forgotPassword(payload: ForgotPasswordType) {
    const { email } = payload;
    const user = await this.userRepo.findUserByEmail(email);
    if (!user) throw new NotFoundException('Tài khoản không tồn tại');
    const otp = await this.otpService.createOTP({
      email,
      type: OtpType.FORGOT_PASSWORD,
    });
    await this.mailService.sendOTPCodeToEmail(email, otp);
  }

  async resetPassword(payload: ResetPasswordType) {
    let email: string;
    try {
      const decoded = this.jwtService.verifyResetToken(payload.token);
      email = decoded.email;
    } catch {
      throw new UnauthorizedException(
        'Reset token không hợp lệ hoặc đã hết hạn',
      );
    }
    await this.userRepo.updateUser(
      { email },
      {
        password: await this.hashingService.hashPassword(payload.password),
      },
    );
    return { message: 'Đặt lại mật khẩu thành công' };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDTO) {
    let payload: { id: string };

    try {
      payload = this.jwtService.verifyRefreshToken(
        refreshTokenDto.refreshToken,
      );
    } catch (err) {
      throw new UnauthorizedException(
        'Refresh token không hợp lệ hoặc đã hết hạn',
      );
    }

    const user = await this.userRepo.findUserByIdOrEmail({ id: payload.id });
    if (!user) throw new UnauthorizedException('User không tồn tại');
    if (
      user.status === AccountStatus.INACTIVE ||
      user.status === AccountStatus.BANNED
    )
      throw new UnauthorizedException('Tài khoản bị khóa hoặc không hoạt động');

    const { accessToken, refreshToken } = await this.generateTokens({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return { accessToken, refreshToken };
  }

  async findOrCreateGoogleUser(payload: GoogleUser) {
    const googleAccount = await this.oauthRepo.findByProviderAndProviderId(
      AuthProvider.GOOGLE,
      payload.googleId,
    );
    if (googleAccount) {
      const user = await this.userRepo.findUserByIdOrEmail({
        id: googleAccount.userId,
      });
      if (user)
        return this.generateTokens({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        });
    } else {
      let user = await this.userRepo.findUserByIdOrEmail({
        email: payload.email,
      });
      if (user) {
        await this.oauthRepo.create({
          userId: user.id,
          provider: AuthProvider.GOOGLE,
          providerUid: payload.googleId,
        });
      } else {
        user = await this.userRepo.createGoogleAccount({
          googleId: payload.googleId,
          name: payload.name,
          email: payload.email,
          avatar: payload.avatar,
        });
      }
      return this.generateTokens({
        name: user.name,
        email: user.email,
        role: user.role,
        id: user.id,
      });
    }
  }
}
