import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { TransactionStatus } from 'src/transaction_status/entities/transaction_status.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports : [
    TypeOrmModule.forFeature([Invoice, TransactionStatus])
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, {
    provide : APP_GUARD,
    useClass : AuthGuard
  }],
})
export class InvoiceModule {}
