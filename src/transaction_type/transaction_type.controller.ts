import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionTypeService } from './transaction_type.service';
import { CreateTransactionTypeDto } from './dto/create-transaction_type.dto';
import { UpdateTransactionTypeDto } from './dto/update-transaction_type.dto';
import { RolesGuard } from 'src/base/roles.guard';
import { Role } from 'src/base/base.entity';
import { Roles } from 'src/base/roles.decorator';

@Controller('transaction-type')
export class TransactionTypeController {
  constructor(private readonly transactionTypeService: TransactionTypeService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @Post('create')
  create(@Body() createTransactionTypeDto: CreateTransactionTypeDto) {
    return this.transactionTypeService.create(createTransactionTypeDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.user)
  @Get()
  findAll() {
    return this.transactionTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionTypeDto: UpdateTransactionTypeDto) {
    return this.transactionTypeService.update(+id, updateTransactionTypeDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionTypeService.remove(id);
  }
}
