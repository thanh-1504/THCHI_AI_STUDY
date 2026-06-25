import { Injectable } from '@nestjs/common';
import { AccountStatus, AuthProvider } from 'generated/prisma/enums';
import { RegisterDTO } from 'src/auth/dto/auth.dto';
import { GoogleUser } from 'src/shared/interfaces/IUser';
import { PrismaService } from 'src/shared/services/prisma.service';
import { UpdateUserType } from '../schemas/update.user.schema';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAllUser() {
    return this.prismaService.user.findMany();
  }

  findUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  findUserByIdOrEmail(payload: { id: string } | { email: string }) {
    return this.prismaService.user.findUnique({
      where: payload,
    });
  }

  registerUser(registerUserDto: RegisterDTO) {
    return this.prismaService.user.create({
      data: registerUserDto,
    });
  }

  createGoogleAccount(payload: GoogleUser) {
    return this.prismaService.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: payload.email,
          name: payload.name,
          password: null,
          status: AccountStatus.ACTIVE,
        },
      });
      await tx.userProfile.create({
        data: {
          userId: user.id,
          displayName: user.name,
          avatarUrl: payload.avatar ?? '',
        },
      });
      await tx.oAuthAccount.create({
        data: {
          userId: user.id,
          provider: AuthProvider.GOOGLE,
          providerUid: payload.googleId,
        },
      });
      return user;
    });
  }

  updateUser(
    where: { id: string } | { email: string },
    payload: UpdateUserType,
  ) {
    return this.prismaService.user.update({
      where: { ...where, deletedAt: null },
      data: { ...payload },
      omit: {
        password: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }
}
