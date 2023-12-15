import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto, checkUUIDDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { RolesGuard } from 'src/base/roles.guard';
import { Role } from 'src/base/base.entity';
import { Roles } from 'src/base/roles.decorator';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('add/amount/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.user)
  create(@Param('id') id: checkUUIDDto, @Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(id, createWalletDto);
  }

  @Get()
  findAll() {
    return this.walletService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.user)
  findOne(@Param('id') id: checkUUIDDto) {
    return this.walletService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  remove(@Param('id') id: checkUUIDDto, amount: CreateWalletDto) {
    return this.walletService.remove(id, amount);
  }
}
