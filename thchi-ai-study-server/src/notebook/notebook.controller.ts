import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { User } from 'src/shared/decorators/user.decorator';
import { CreateNoteBookDTO } from './dto/create-notebook.dto';
import { NotebookService } from './notebook.service';

@Controller('notebook')
export class NotebookController {
  constructor(private readonly notebookService: NotebookService) {}

  @Get()
  getNoteBook(@User('id') userId: string) {
    return this.notebookService.getNoteBookByUserId(userId);
  }

  @Get('/search')
  findWordInNoteBook(@User('id') userId: string, @Query('word') word: string) {
    return this.notebookService.findWordInNoteBook(userId, word);
  }

  @Get('/words-due')
  getWordsDue(@User('id') userId: string) {
    return this.notebookService.getWordsDue(userId);
  }

  @Post('')
  createNoteBook(
    @User('id') userId: string,
    createNoteBookDto: CreateNoteBookDTO,
  ) {
    return this.notebookService.createNoteBook(userId, createNoteBookDto);
  }

  @Delete('/entries/:wordId')
  deleteWordInNoteBook(
    @User('id') userId: string,
    @Param('wordId') wordId: string,
  ) {
    return this.notebookService.deleteWordInNoteBook(userId, wordId);
  }
}
