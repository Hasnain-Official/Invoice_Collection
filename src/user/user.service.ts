import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Wallet } from 'src/wallet/entities/wallet.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>
  ) {}
  async create(createUserDto: CreateUserDto) {
    const {firstName, lastName, phone, walletBalance, cardNumber, ifscCode, bankName, password}: CreateUserDto = createUserDto;
    const user_data = await this.userRepository.findOne({
      where : {
        phone : phone,
        role : 'user'
      }
    });
    if(user_data) {
      return {status : 400, message : `User Already Exists`, data : createUserDto};
    } else {
      const user_obj = {
        id : uuidv4(),
        first_name : firstName,
        last_name : lastName,
        phone : phone,
        password : password,
        role : 'user'
      };
      await this.userRepository.create(user_obj);
      const wallet_obj = {
        id : uuidv4(),
        card_number : cardNumber,
        bank_name: bankName,
        ifsc_code : ifscCode,
        user_uuid: user_obj['id'],
        amount : walletBalance || 0
      };
      await this.walletRepository.create(wallet_obj);
      return {status : 200, message : `User Created Successfully`, data : createUserDto};
    }
  }

  async login(loginDto: LoginDto) {
    const {phone, password} = loginDto;
    const user_data = await this.userRepository.findOne({
      where : {
        phone : phone,
        password : password
      }
    });
    if(!user_data) {
      return {status : 400, message : `User not found`, data : loginDto};
    }
    return {status : 200, message : `Login Successful`, data : loginDto, token : 'qazwsxedcrfvtgbyhnujmikolp'};
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
