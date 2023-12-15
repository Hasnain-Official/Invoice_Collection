import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto, WebhookBodyDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { RolesGuard } from 'src/base/roles.guard';
import { Roles } from 'src/base/roles.decorator';
import { Role } from 'src/base/base.entity';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post(':invoiceId')
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.user)
  async create(@Req() request, @Param('invoiceId') invoiceId: string, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(request?.user, invoiceId, createTransactionDto);
  }

  @Post('webhook')
  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.user)
  async webhook(@Req() req, @Body() bodyDto: WebhookBodyDto) {
    return this.transactionService.webhook(req?.user, bodyDto)
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
