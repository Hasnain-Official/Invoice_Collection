import { Injectable } from '@nestjs/common';
import { CreateAdminDto, LoginDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {v4 as uuidv4} from 'uuid'

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const {firstName, lastName, phone, password}: CreateAdminDto = createAdminDto;
    const user_data = await this.userRepository.findOne({
      where : {
        phone : phone,
        role : 'admin'
      }
    });
    if(user_data) {
      return {status : 400, message : `Admin Already Exists`, data : createAdminDto};
    } else {
      const user_obj = {
        id : uuidv4(),
        first_name : firstName,
        last_name : lastName,
        phone : phone,
        password : password,
        role : 'admin'
      };
      await this.userRepository.create(user_obj);
      return {status : 200, message : `Admin Created Successfully`, data : createAdminDto};
    }
  }

  async login(loginDto: LoginDto) {
    const {phone, password} = loginDto;
    const user_data = await this.userRepository.findOne({
      where : {
        phone : phone,
        password : password,
        role : 'admin'
      }
    });
    if(!user_data) {
      return {status : 400, message : `Admin not found`, data : loginDto};
    }
    return {status : 200, message : `Login Successful`, data : loginDto, token : 'aqazwsxedcrfvtgbyhnujmikolpa'};
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
