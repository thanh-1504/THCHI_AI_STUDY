import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const PaginationQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});
export type PaginationQueryType = z.infer<typeof PaginationQuerySchema>;
export class PaginationQueryDTO extends createZodDto(PaginationQuerySchema) {}
