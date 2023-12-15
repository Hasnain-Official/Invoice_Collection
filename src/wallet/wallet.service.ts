import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto, checkUUIDDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>
  ) {}
  async create(uuid : checkUUIDDto , createWalletDto: CreateWalletDto) {
    try {
      const {id} = uuid;
      const {amount} = createWalletDto;
      await this.walletRepository.increment({
        id : id
      }, 'amount', amount);
      return {status : 200, message : `Amount added successfully`};
    } catch(err) {
      console.error(`Error => `, err);
      throw new Error(`Something went wrong!, Amount not added`);
    }
  }

  findAll() {
    return `This action returns all wallet`;
  }

  async findOne(uuid: checkUUIDDto) {
    try {
      const {id} = uuid;
      const wallet_data = await this.walletRepository.findOne({
        where : {
          id : id
        }, 
        select : {
          id : true,
          amount : true,
          bank_name : true,
          card_number : true,
          ifsc_code: true
        }
      });
      if(!wallet_data) {
        return {status: 400, message : `Wallet not found`};
      }
      return {status : 200, message : `Wallet found`, data : wallet_data}
    } catch(err) {
      console.error('Error => ', err);
      throw new NotFoundException(`Something went wrong!, Wallet not found`);
    }
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  async remove(uuid: checkUUIDDto, wallet: CreateWalletDto) {
    try {
      const {id} = uuid;
      const {amount} = wallet;
      await this.walletRepository.decrement({
        id : id
      }, 'amount', amount);
      return {status : 200, message: `Amount deducted successfully`};
    } catch(err) {
      console.error("Error => ", err);
      throw new Error(`Operation failed to remove amount from Wallet`);
    }
  }
}
