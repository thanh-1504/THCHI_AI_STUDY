import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/shared/decorators/user.decorator';
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(
    @User('id') userId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionService.create(userId, createTransactionDto);
  }
}
