import { Injectable } from '@nestjs/common';
import { CreateTransactionStatusDto } from './dto/create-transaction_status.dto';
import { UpdateTransactionStatusDto } from './dto/update-transaction_status.dto';
import { Repository } from 'typeorm';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { TransactionStatus } from './entities/transaction_status.entity';

@Injectable()
export class TransactionStatusService {
  constructor(
    // private readonly transactionRepository: Repository<TransactionStatus>
  ) {}
  async create(createTransactionStatusDto: CreateTransactionStatusDto) {

    return 'This action adds a new transactionStatus';
  }

  findAll() {
    return `This action returns all transactionStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionStatus`;
  }

  update(id: number, updateTransactionStatusDto: UpdateTransactionStatusDto) {
    return `This action updates a #${id} transactionStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionStatus`;
  }
}
