import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { BaseModule } from './base/base.module';
import { TransactionTypeModule } from './transaction_type/transaction_type.module';
import { TransactionStatusModule } from './transaction_status/transaction_status.module';
import { InvoiceModule } from './invoice/invoice.module';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { AdminModule } from './admin/admin.module';
import { CustomMiddlewareService } from './custom-middleware/custom-middleware.service';

@Module({
  imports: [UserModule, DatabaseModule, BaseModule, TransactionTypeModule, TransactionStatusModule, InvoiceModule, WalletModule, TransactionModule, AdminModule],
  controllers: [AppController],
  providers: [AppService, CustomMiddlewareService],
})
export class AppModule {
  configure(generic : MiddlewareConsumer) {
    generic.apply(CustomMiddlewareService).exclude({
      path : 'user/login',
      method : RequestMethod.ALL
    }, {
      path : 'user/register', 
      method: RequestMethod.ALL
    }, {
      path : 'admin/login',
      method : RequestMethod.ALL
    }, {
      path : 'admin/register', 
      method: RequestMethod.ALL
    }).forRoutes('*');
  }
}
