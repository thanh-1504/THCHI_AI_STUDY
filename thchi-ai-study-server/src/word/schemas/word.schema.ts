import { WordType as WordTypeEnum } from 'generated/prisma/enums';
import z from 'zod';

const WordDefinitionSchema = z.object({
  // wordId: z.string(),
  wordType: z.nativeEnum(WordTypeEnum),
  meaning: z.string(),
});

const WordExampleSchema = z.object({
  // wordId: z.string(),
  sentence: z.string(),
  translation: z.string().optional().nullable(),
  isAiGenerated: z.boolean().default(false),
  // createdAt: z.date().default(new Date()),
});

const WordSchema = z.object({
  id: z.string().optional(),
  term: z.string().min(1, 'Từ vựng không được để trống').max(100),
  phonetic: z.string().max(100).nullable(),
  audioUrl: z.string().url('URL audio không hợp lệ').nullable(),
  definitions: z.array(WordDefinitionSchema).min(1, 'Phải có ít nhất 1 nghĩa'),
  examples: z.array(WordExampleSchema).optional().default([]),
});
export default WordSchema;
export type Word = z.infer<typeof WordSchema>;
