import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto, checkUUIDDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionStatus } from 'src/transaction_status/entities/transaction_status.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository : Repository<Invoice>,
    @InjectRepository(TransactionStatus)
    private readonly statusRepository : Repository<TransactionStatus>
  ) {}
  async create(createInvoiceDto: CreateInvoiceDto) {
    const {total_amount, pending_amount, due_date} = createInvoiceDto;
    const status_pending = await this.statusRepository.findOne({
      where : {
        status : 'Pending'
      }
    });
    const invoice_obj_id = uuidv4();
    const invoice_obj = {
      id : invoice_obj_id,
      invoiceNumber : total_amount+invoice_obj_id+due_date,
      total_amount : total_amount,
      due_date : due_date,
      status_uuid : status_pending?.id,
      pendingAmount : pending_amount,
    };
    await this.invoiceRepository.save(invoice_obj);
    return {status : 200, message : `Invoice Generated`, data : invoice_obj};
  }

  async findAll() {
    const invoices_data = await this.invoiceRepository.find({
      select : {
        id : true,
        invoiceNumber : true,
        total_amount : true,
        due_date : true,
        pendingAmount : true,
        status : {
          id : true,
          status : true
        }
      },
      relations : ['status']
    });
    return {status : 200, message : `Invoices Fetched Successfully`, data : invoices_data};
  }

  async findOne(uuid: checkUUIDDto) {
    const {id} = uuid;
    const invoices_data = await this.invoiceRepository.findOne({
      where : {id : id},
      select : {
        id : true,
        invoiceNumber : true,
        total_amount : true,
        due_date : true,
        pendingAmount : true,
        status : {
          id : true,
          status : true
        }
      },
      relations : ['status']
    });
    return {status : 200, message : `Invoice Found`, data : invoices_data || {}};
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const {total_amount, due_date, pending_amount} = updateInvoiceDto;
    const update_obj = {};
    if(total_amount) {
      update_obj['total_amount'] = total_amount;
    }
    if(due_date) {
      update_obj['due_date'] = due_date;
    }
    if(pending_amount) {
      update_obj['pending_amount'] = pending_amount;
    }
    await this.invoiceRepository.update(update_obj, {
      invoiceNumber : id
    });
    return {status : 200, message : `Invoice Updated Successfully`, data : updateInvoiceDto};
  }

  async remove(uuid: checkUUIDDto) {
    const {id} = uuid;
    await this.invoiceRepository.delete({
      id : id
    });
    return {status : 200, message : `Invoice Removed Successfully`};
  }

  async status(invoiceId: checkUUIDDto, status: string) {
    const {id} = invoiceId;
    if(!status) {
      return {status : 400, message : `Missing required parameters : status`};
    }
    const status_data = await this.statusRepository.findOne({
      where : {
        status : status
      }
    });
    if(!status_data) {
      return {status : 400, message : `Status not found`, data : status};
    }
    await this.invoiceRepository.update({
      status_uuid : status_data?.id
    }, {
      id : id
    });
    return {status : 200, message : `Status Changed`, data : status};
  }
}
