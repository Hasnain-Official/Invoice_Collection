import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BaseModule } from './base/base.module';
import { TransactionTypeModule } from './transaction_type/transaction_type.module';
import { TransactionStatusModule } from './transaction_status/transaction_status.module';
import { InvoiceModule } from './invoice/invoice.module';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { CustomMiddlewareService } from './custom-middleware/custom-middleware.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, BaseModule, TransactionTypeModule, TransactionStatusModule, InvoiceModule, WalletModule, TransactionModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, CustomMiddlewareService],
})
export class AppModule {
}
