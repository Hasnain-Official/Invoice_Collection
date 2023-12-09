// database.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { TransactionStatus } from 'src/transaction_status/entities/transaction_status.entity';
import { TransactionType } from 'src/transaction_type/entities/transaction_type.entity';
import { User } from 'src/user/entities/user.entity';
// import { User } from './user.entity'; // Import your entities

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // Import the configuration from ormconfig.json or use it directly here
      // It's also possible to use ConfigModule for dynamic configuration
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [User, Transaction, TransactionStatus, TransactionType, Invoice], // Add your entities here
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
