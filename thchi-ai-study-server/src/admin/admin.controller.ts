import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { Role } from 'generated/prisma/enums';
import { Roles } from 'src/shared/decorators/role.decorator';
import { AdminService } from './admin.service';
import { PaginationTransactionAdminDTO } from './dto/pagination.transaction.admin.dto';
import { PaginationUserAdminDTO } from './dto/pagination.user.admin';
import { UpdateStatusAccountDTO } from './dto/update-admin.dto';

@Roles(Role.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/users')
  getUsers(@Query() query: PaginationUserAdminDTO) {
    return this.adminService.getUsers(query);
  }

  @Get('/users/:id')
  getUserDetail(@Param('id') id: string) {
    return this.adminService.getUserDetail(id);
  }

  @Get('/dashboard/stats')
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('/top-courses')
  getTopCourse() {
    return this.adminService.getTopCourse();
  }

  @Get('/transaction-latest')
  getLatestTransactions() {
    return this.adminService.getLatestTransactions();
  }

  @Patch('users/:id/status')
  updateUserStatus(
    @Param('id') userId: string,
    @Body('status') status: UpdateStatusAccountDTO,
  ) {
    return this.adminService.updateUserStatus(userId, status);
  }

  // Transaction
  @Get('/transactions')
  getTransactions(@Query() query: PaginationTransactionAdminDTO) {
    return this.adminService.getTransactions(query);
  }

  @Get('/transactions/:id')
  getTransactionDetail(@Param('id') id: string) {
    return this.adminService.getTransactionDetail(id);
  }
}
