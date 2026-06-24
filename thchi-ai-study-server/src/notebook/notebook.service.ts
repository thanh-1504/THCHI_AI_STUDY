import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NoteBookRepo } from './repos/notebook.repo';
import { CreateNoteBookType } from './schemas/notebook.schema';

@Injectable()
export class NotebookService {
  constructor(private readonly noteBookRepo: NoteBookRepo) {}

  async findWordInNoteBook(userId: string, word: string) {
    const noteBook = await this.noteBookRepo.findOne(userId);
    if (!noteBook) throw new NotFoundException('Notebook của bạn chưa tồn tại');
    const entry = await this.noteBookRepo.findWordInNoteBook(userId, word);
    if (!entry)
      throw new NotFoundException(`Không tìm thấy từ "${word}" trong notebook`);

    return { word: entry.word };
  }

  async getNoteBookByUserId(userId: string) {
    const noteBook = await this.noteBookRepo.findOne(userId);
    if (!noteBook) return null;
    const [totalWordsSleeping, totalWordsActive] = await Promise.all([
      this.noteBookRepo.countWordsSleeping(noteBook.id),
      this.noteBookRepo.countWordsActive(noteBook.id),
    ]);
    return {
      ...noteBook,
      totalWordsActive,
      totalWordsSleeping,
    };
  }

  async getWordsDue(userId: string) {
    return await this.noteBookRepo.getWordsDue(userId);
  }

  async createNoteBook(userId: string, createNoteBookDto: CreateNoteBookType) {
    const noteBook = await this.noteBookRepo.findOne(userId);
    if (noteBook) {
      throw new BadRequestException('Sổ tay đã tồn tại');
    }
    return this.noteBookRepo.createNoteBook(userId, createNoteBookDto);
  }

  async deleteWordInNoteBook(userId: string, wordId: string) {
    const noteBook = await this.noteBookRepo.findOne(userId);
    if (!noteBook) throw new NotFoundException('Notebook không tồn tại');
    return await this.noteBookRepo.deleteWordInNoteBook(noteBook.id, wordId);
  }
}
