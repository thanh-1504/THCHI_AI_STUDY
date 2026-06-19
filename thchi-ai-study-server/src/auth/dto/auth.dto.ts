import { createZodDto } from 'nestjs-zod';

import {
  CreateOTPSchema,
  SendOtpSchema,
  VerifyOtpSchema,
} from 'src/shared/schemas/otp.schema';
import ForgotPasswordSchema from '../schemas/forgot.password.schema';
import { LoginResponseSchema, LoginSchema } from '../schemas/login.schema';
import { RefreshTokenSchema } from '../schemas/refresh-token.schema';
import RegisterSchema from '../schemas/register.schema';
import ResetPasswordSchema from '../schemas/reset.password.schema';

export class RegisterDTO extends createZodDto(RegisterSchema) {}
export class LoginDTO extends createZodDto(LoginSchema) {}
export class LoginResponseDTO extends createZodDto(LoginResponseSchema) {}
export class RefreshTokenDTO extends createZodDto(RefreshTokenSchema) {}
export class CreateOTPDTO extends createZodDto(CreateOTPSchema) {}
export class VerifyOtpDTO extends createZodDto(VerifyOtpSchema) {}
export class SendOtpDTO extends createZodDto(SendOtpSchema) {}
export class ForgotPasswordDTO extends createZodDto(ForgotPasswordSchema) {}
export class ResetPasswordDTO extends createZodDto(ResetPasswordSchema) {}
