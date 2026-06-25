import { AccountStatus } from 'generated/prisma/enums';
import z from 'zod';

export const UpdateStatusAccountSchema = z.object({
  status: z.nativeEnum(AccountStatus),
});

export type UpdateStatusAccountType = z.infer<typeof UpdateStatusAccountSchema>;
