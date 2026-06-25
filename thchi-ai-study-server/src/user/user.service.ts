import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDTO } from './dto/update.user.dto';
import { UserRepository } from './repos/user.repo';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  // findAll() {
  //   return `This action returns all user`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
  async update(
    where: { id: string } | { email: string },
    updateUserDto: UpdateUserDTO,
  ) {
    const user = await this.userRepo.findUserByIdOrEmail(where);
    if (!user) throw new BadRequestException('Không tìm thấy người dùng');
    return await this.userRepo.updateUser({ email: user.email }, updateUserDto);
  }
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
