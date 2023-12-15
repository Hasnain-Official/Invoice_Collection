import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto, checkUUIDDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { RolesGuard } from 'src/base/roles.guard';
import { Roles } from 'src/base/roles.decorator';
import { Role } from 'src/base/base.entity';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.user)
  @Post('generate')
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.user)
  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.user)
  @Get(':id')
  findOne(@Param('id') id: checkUUIDDto) {
    return this.invoiceService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(id, updateInvoiceDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @Delete(':id')
  remove(@Param('id') id: checkUUIDDto) {
    return this.invoiceService.remove(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.admin, Role.user)
  @Get('invoice/status/:invoiceId')
  status(@Param('invoiceId') invoiceId : checkUUIDDto, @Query('status') status: string) {
    return this.invoiceService.status(invoiceId, status);
  }
}
