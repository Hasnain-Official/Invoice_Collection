import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([User, Wallet])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
