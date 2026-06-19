import UserSchema from 'src/shared/schemas/user.schema';
import z from 'zod';

const UpdateUserSchema = UserSchema.pick({
  name: true,
  email: true,
  password: true,
  role: true,
  status: true,
}).partial();
export default UpdateUserSchema;
export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
