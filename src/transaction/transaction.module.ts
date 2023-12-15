import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { TransactionType } from 'src/transaction_type/entities/transaction_type.entity';
import { TransactionStatus } from 'src/transaction_status/entities/transaction_status.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Transaction, Invoice, TransactionType, TransactionStatus, Wallet, User])
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
