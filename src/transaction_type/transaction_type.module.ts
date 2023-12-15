import { Module } from '@nestjs/common';
import { TransactionTypeService } from './transaction_type.service';
import { TransactionTypeController } from './transaction_type.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionType } from './entities/transaction_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionType])],
  controllers: [TransactionTypeController],
  providers: [TransactionTypeService, {
    provide : APP_GUARD,
    useClass: AuthGuard
  }],
})
export class TransactionTypeModule {}
