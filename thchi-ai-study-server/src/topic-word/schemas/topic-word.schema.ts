import WordSchema from 'src/word/schemas/word.schema';
import z from 'zod';

const TopicWordSchema = WordSchema.omit({ id: true }).extend({
  orderIndex: z.number().default(0),
  imageUrl: z.string().url().optional(),
});

export default TopicWordSchema;
export type TopicWord = z.infer<typeof TopicWordSchema>;
