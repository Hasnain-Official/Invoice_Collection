import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports : [TypeOrmModule.forFeature([User, Wallet]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    })          
],
  controllers: [AuthController],
  providers: [AuthService, {
    provide : APP_GUARD,
    useClass: AuthGuard
  }],
})
export class AuthModule {}
