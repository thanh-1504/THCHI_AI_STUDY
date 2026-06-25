import {
  AccountStatus,
  PremiumDuration,
  Role,
  TransactionStatus,
} from 'generated/prisma/enums';
import { PaginationSchema } from 'src/shared/schemas/pagination.schema';
import z from 'zod';

export const PaginationUserAdminSchema = PaginationSchema.extend({
  name_email: z.string().optional().default(''),
  role: z.nativeEnum(Role).optional(),
  status: z.nativeEnum(AccountStatus).optional(),
});

export const PaginationTransactionSchema = PaginationSchema.extend({
  idTransaction: z.string().optional().default(''),
  plan: z.nativeEnum(PremiumDuration).optional(),
  status: z.nativeEnum(TransactionStatus).optional(),
  createdAt: z.date().optional(),
});

export type PaginationUserAdminType = z.infer<typeof PaginationUserAdminSchema>;
export type PaginationTransactionType = z.infer<typeof PaginationTransactionSchema>;

