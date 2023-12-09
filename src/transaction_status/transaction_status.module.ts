import { Module } from '@nestjs/common';
import { TransactionStatusService } from './transaction_status.service';
import { TransactionStatusController } from './transaction_status.controller';

@Module({
  controllers: [TransactionStatusController],
  providers: [TransactionStatusService],
})
export class TransactionStatusModule {}
