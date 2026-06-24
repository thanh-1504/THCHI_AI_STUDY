import { Module } from '@nestjs/common';
import { NotebookController } from './notebook.controller';
import { NotebookService } from './notebook.service';
import { NoteBookRepo } from './repos/notebook.repo';

@Module({
  controllers: [NotebookController],
  providers: [NotebookService, NoteBookRepo],
})
export class NotebookModule {}
