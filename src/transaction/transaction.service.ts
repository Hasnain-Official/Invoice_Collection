import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { v4 as uuidv4 } from 'uuid';
import { TransactionType } from 'src/transaction_type/entities/transaction_type.entity';
import { TransactionStatus } from 'src/transaction_status/entities/transaction_status.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(TransactionType)
    private readonly typeRepository: Repository<TransactionType>,
    @InjectRepository(TransactionStatus)
    private readonly statusRepository: Repository<TransactionStatus>
  ) {}
  async create(invoiceId, createTransactionDto: CreateTransactionDto) {
    const {to, from, amount} = createTransactionDto;
    const invoiceData = await this.invoiceRepository.findOne({
      where : {
        id : invoiceId
      }
    });
    if(!invoiceData) {
      return {status : 400, message : `No such invoice found`};
    }
    const transaction_type = await this.typeRepository.findOne({
      where : {
        type : 'Online'
      }
    });

    const transaction_status = await this.statusRepository.findOne({
      where : {
        status: 'pending'
      }
    })
    const transaction_obj: {
      id : any,
      to: any,
      from: any,
      transactionId : string,
      amount : number,
      transaction_type_uuid : any,
      transaction_status_uuid : any
    } = {
      id : uuidv4(),
      to: to,
      from: from,
      transactionId : to+from,
      amount : amount,
      transaction_type_uuid : transaction_type?.id,
      transaction_status_uuid : transaction_status?.id
    };
    await this.transactionRepository.create(transaction_obj);
    await this.invoiceRepository.update({
      pendingAmount : invoiceData?.pendingAmount - amount
    }, {
      id : invoiceData?.id
    });
    const transaction_status_completed = await this.statusRepository.findOne({
      where : {
        status: 'Completed'
      }
    });
    await this.transactionRepository.update({
      transaction_status_uuid : transaction_status_completed?.id
    }, {
      id : transaction_obj?.id
    });
    return {status : 200, message : `Transaction Successful`};
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
