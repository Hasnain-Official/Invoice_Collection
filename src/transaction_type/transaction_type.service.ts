import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTransactionTypeDto } from './dto/create-transaction_type.dto';
import { UpdateTransactionTypeDto } from './dto/update-transaction_type.dto';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { TransactionType } from './entities/transaction_type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionTypeService {
  constructor(
    @InjectRepository(TransactionType)
    private readonly typeRepository: Repository<TransactionType>
  ) {}
  async create(createTransactionTypeDto: CreateTransactionTypeDto) {
    try {
      const {type} = createTransactionTypeDto;
      const type_obj = {
        id : uuidv4(),
        type : type
      };
      await this.typeRepository.save(type_obj);
      return {status : 200, message : `New Transaction Type Created`};
    } catch(err) {
      console.error("Error => ", err);
      throw new UnauthorizedException(`Type Not Created, Something went wrong!`);
    }
  }

  async findAll() {
    try {
      const type_data = await this.typeRepository.find();
      return {status: 200, message : `Retrieved : Transaction Types`, data : type_data || []};
    } catch(err) {
      console.error("Error => ", err);
      throw new NotFoundException(`No data found`);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionType`;
  }

  update(id: number, updateTransactionTypeDto: UpdateTransactionTypeDto) {
    return `This action updates a #${id} transactionType`;
  }

  async remove(id: string) {
    try {
      if (!this.isValidUUID(id)) {
        throw new HttpException('Invalid UUID', HttpStatus.BAD_REQUEST);
      }
      const type_data = await this.typeRepository.findOne({
        where : {
          id : id
        }
      });
      if(type_data) {
        throw new NotFoundException(`No data found`);
      }
      await this.typeRepository.delete({
        id : id
      });
      return {status: 200, message: `Removed: Transaction Type`};
    } catch(err) {
      console.error("Error => ", err);
      throw new Error(`Failed to remove Type`);
    }
  }

  private isValidUUID(id: string): boolean {
    return uuidv4(id) !== null;
  }
}
