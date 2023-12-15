import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionStatusService } from './transaction_status.service';
import { CreateTransactionStatusDto } from './dto/create-transaction_status.dto';
import { UpdateTransactionStatusDto } from './dto/update-transaction_status.dto';
import { RolesGuard } from 'src/base/roles.guard';
import { Roles } from 'src/base/roles.decorator';
import { Role } from 'src/base/base.entity';

@Controller('transaction-status')
export class TransactionStatusController {
  constructor(private readonly transactionStatusService: TransactionStatusService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @Post('create')
  create(@Body() createTransactionStatusDto: CreateTransactionStatusDto) {
    return this.transactionStatusService.create(createTransactionStatusDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.user)
  @Get()
  findAll() {
    return this.transactionStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionStatusDto: UpdateTransactionStatusDto) {
    return this.transactionStatusService.update(+id, updateTransactionStatusDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionStatusService.remove(id);
  }
}
