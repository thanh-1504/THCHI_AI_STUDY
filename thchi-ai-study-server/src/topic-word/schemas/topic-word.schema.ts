import WordSchema from 'src/word/schemas/word.schema';
import z from 'zod';

const TopicWordSchema = WordSchema.omit({ id: true }).extend({
  orderIndex: z.number().default(0),
  imageUrl: z.string().url().optional(),
});

export const TopicIncludeWordItem = z.object({
  id: z.string(),
  topicId: z.string(),
  imageUrl: z.string(),
  word: WordSchema,
});

export const TopicIncludeWordSchema = z
  .array(TopicIncludeWordItem)
  .transform((items) => {
    if (items.length === 0) return null;
    return {
      id: items[0].id,
      topicId: items[0].topicId,
      imageUrl: items[0].imageUrl,
      words: items.map((item) => {
        return {
          id: item.word.id,
          term: item.word.term,
          phonetic: item.word.phonetic,
          audioUrl: item.word.audioUrl,
          definitions: item.word.definitions,
          examples: item.word.examples,
        };
      }),
    };
  });
export default TopicWordSchema;
export type TopicWord = z.infer<typeof TopicWordSchema>;
