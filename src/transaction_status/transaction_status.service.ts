import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTransactionStatusDto } from './dto/create-transaction_status.dto';
import { UpdateTransactionStatusDto } from './dto/update-transaction_status.dto';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { TransactionStatus } from './entities/transaction_status.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionStatusService {
  constructor(
    @InjectRepository(TransactionStatus)
    private readonly statusRepository: Repository<TransactionStatus>
  ) {}
  async create(createTransactionStatusDto: CreateTransactionStatusDto) {
    try {
      const {status} = createTransactionStatusDto;
      const status_obj = {
        id : uuidv4(),
        status : status
      };
      await this.statusRepository.save(status_obj);
      return {status : 200, message : `New Transaction Status Created`};
    } catch(err) {
      console.error("Error => ", err);
      throw new UnauthorizedException(`Status Not Created, Something went wrong!`);
    }
  }

  async findAll() {
    try {
      const status_data = await this.statusRepository.find();
      return {status: 200, message : `Retrieved : Transaction Status`, data : status_data || []};
    } catch(err) {
      console.error("Error => ", err);
      throw new NotFoundException(`No data found`);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionStatus`;
  }

  update(id: number, updateTransactionStatusDto: UpdateTransactionStatusDto) {
    return `This action updates a #${id} transactionStatus`;
  }

  async remove(id: string) {
    try {
      if (!this.isValidUUID(id)) {
        throw new HttpException('Invalid UUID', HttpStatus.BAD_REQUEST);
      }
      const status_data = await this.statusRepository.findOne({
        where : {
          id : id
        }
      });
      if(status_data) {
        throw new NotFoundException(`No data found`);
      }
      await this.statusRepository.delete({
        id : id
      });
      return {status: 200, message: `Removed: Transaction Status`};
    } catch(err) {
      console.error("Error => ", err);
      throw new Error(`Failed to remove Type`);
    }
  }
  
  private isValidUUID(id: string): boolean {
    return uuidv4(id) !== null;
  }
}
