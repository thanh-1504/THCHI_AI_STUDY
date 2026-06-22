import z from 'zod';

const CourseEnrollSchema = z.object({
  userId: z.string().uuid(),
  courseId: z.string().uuid(),
  enrolledAt: z.date().default(new Date()),
  completedAt: z.date().optional(),
  lastAccessedAt: z.date().optional(),
});

export const CreateCourseEnrollSchema = CourseEnrollSchema.pick({
  userId: true,
  courseId: true,
});
export type CourseEnrollType = z.infer<typeof CourseEnrollSchema>;
export type CreateCourseEnrollType = z.infer<typeof CreateCourseEnrollSchema>;
export default CourseEnrollSchema;
