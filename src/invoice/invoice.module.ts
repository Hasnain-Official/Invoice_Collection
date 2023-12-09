import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { TransactionStatus } from 'src/transaction_status/entities/transaction_status.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Invoice, TransactionStatus])
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
