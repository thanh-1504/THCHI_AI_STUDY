import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma/browser';
import { AdminRepo } from './repos/admin.repo';
import { UpdateStatusAccountType } from './schemas/admin.schema';
import {
  PaginationTransactionType,
  PaginationUserAdminType,
} from './schemas/pagination.schema';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepo: AdminRepo) {}

  async getUsers(query: PaginationUserAdminType) {
    const { page, limit, name_email, role, status } = query;
    const take = limit || 10;
    const skip = (page - 1) * take;
    const where: Prisma.UserWhereInput = {};

    if (name_email) {
      where.OR = [
        { email: { contains: name_email, mode: 'insensitive' } },
        { name: { contains: name_email, mode: 'insensitive' } },
      ];
    }

    if (role) where.role = role;

    if (status) {
      where.status = status;
    }
    const { total, users } = await this.adminRepo.getUsers({
      skip,
      take,
      where,
    });
    return {
      total,
      page,
      limit,
      users,
    };
  }

  async getUserDetail(id: string) {
    const userDetail = await this.adminRepo.getUserDetail(id);
    if (!userDetail)
      throw new NotFoundException('Không tìm thấy hồ sơ người dùng');
    return {
      id: userDetail.id,
      name: userDetail.name,
      email: userDetail.email,
      role: userDetail.role,
      avatarUrl: userDetail.profile?.avatarUrl,
      premiumPlan: {
        startDate: userDetail.subscription?.startDate,
        endDate: userDetail.subscription?.endDate,
        isActive: userDetail.subscription?.isActive,
        name: userDetail.subscription?.plan?.name,
      },
      stats: {
        totalCourses: userDetail._count.courseEnrollments,
        totalWordsSaved: userDetail.notebook?.totalWordsSaved ?? 0,
      },
      createdAt: userDetail.createdAt,
    };
  }

  async updateUserStatus(userId: string, status: UpdateStatusAccountType) {
    return await this.adminRepo.updateUserStatus(userId, status);
  }

  async getDashboardStats() {
    const [
      totalUsers,
      premiumUsers,
      totalRevenue,
      totalCourses,
      totalTopics,
      newUsersToday,
    ] = await this.adminRepo.getDashboardStats();

    return {
      totalUsers,
      premiumUsers,
      freeUsers: totalUsers - premiumUsers,
      totalRevenue: totalRevenue._sum.amount,
      totalCourses,
      totalTopics,
      newUsersToday,
    };
  }

  async getTopCourse() {
    const result = await this.adminRepo.getTopCourse();
    return result.map((item) => ({
      title: item.title,
      enrollmentCount: item._count.enrollments,
    }));
  }

  async getLatestTransactions() {
    const result = await this.adminRepo.getLatestTransactions();
    return result.map((item) => ({
      email: item.user.email,
      amount: item.amount,
      plan: item.plan.name,
      status: item.status,
    }));
  }

  async getTransactions(query: PaginationTransactionType) {
    const { page, limit, idTransaction, plan, status, createdAt } = query;
    const take = limit || 10;
    const skip = (page - 1) * take;
    const where: Prisma.TransactionWhereInput = {};
    if (idTransaction) where.id = idTransaction;
    if (plan) where.plan = { duration: plan };
    if (status) where.status = status;
    if (createdAt) where.createdAt = createdAt;
    const { total, transactions } = await this.adminRepo.getTransactions({
      skip,
      take,
      where,
    });
    return {
      total,
      page,
      limit,
      data: transactions.map((item) => ({
        id: item.id,
        plan: item.plan.name,
        amount: item.amount,
        status: item.status,
        createdAt: item.createdAt,
      })),
    };
  }

  async getTransactionDetail(id: string) {
    const result = await this.adminRepo.getTransactionDetail(id);
    if (!result) throw new NotFoundException('Không tìm thấy giao dịch này');
    return result;
  }
}
