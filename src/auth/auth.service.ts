import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserSignInAuthDto, UserSignUpAuthDto, AdminSignInAuthDto, AdminSignUpAuthDto, userObjDto, walletObjDto, adminObjDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/base/base.entity';
import { v4 as uuidv4 } from 'uuid';
import { Wallet } from 'src/wallet/entities/wallet.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>

  ) {}
  async userSignIn(signInAuthDto: UserSignInAuthDto) {
    try {
      const {phone, password} = signInAuthDto;
      const user_data = await this.userRepository.findOne({
      where : {
        phone : phone,
        password : password,
        role : Role.user
      }
    });
    if(!user_data) {
      return {status : 400, message : `User not found`, data : signInAuthDto};
    }
    const payload  = {
      id : user_data?.id,
      firstName : user_data?.first_name,
      lastName : user_data?.last_name,
      role : Role.user
    }
    return {status : 200, message : `Login Successful`, data : signInAuthDto, access_token: await this.jwtService.signAsync(payload)};
    } catch(err) {
      console.log("Error => ", err);
      throw new UnauthorizedException(`Can't Login, Something went wrong.`);
    }
  }

  async userSignUp(signUpAuthDto : UserSignUpAuthDto) {
   try {
    const {firstName, lastName, phone, walletBalance, cardNumber, ifscCode, bankName, password}: UserSignUpAuthDto = signUpAuthDto;
    const user_data = await this.userRepository.findOne({
      where : {
        phone : phone,
        role : Role.user
      }
    });
    if(user_data) {
      return {status : 400, message : `User Already Exists`, data : signUpAuthDto};
    } else {
      const user_obj : userObjDto  = {
        id : uuidv4(),
        first_name : firstName,
        last_name : lastName,
        phone : phone,
        password : password,
        role : 'user'
      };
      console.log("Check - > ", user_obj);
      
      await this.userRepository.create(user_obj);
      const wallet_obj: walletObjDto = {
        id : uuidv4(),
        card_number : cardNumber,
        bank_name: bankName,
        ifsc_code : ifscCode,
        user_uuid: user_obj['id'],
        amount : walletBalance || 0
      };
      console.log("Wallet - > ", wallet_obj);
      
      await this.walletRepository.create(wallet_obj);
      return {status : 200, message : `User Created Successfully`};
    }
   } catch(err) {
    console.log("Error = > ", err);
    throw new ConflictException(`User SignUp Failed`);
   }
  }

  async adminSignIn(signInAuthDto: AdminSignInAuthDto) {
    try {
      const {phone, password} = signInAuthDto;
      const user_data = await this.userRepository.findOne({
      where : {
        phone : phone,
        password : password,
        role : Role.admin
        }
      });
      if(!user_data) {
        return {status : 400, message : `Admin not found`, data : signInAuthDto};
      }
      const payload  = {
        id : user_data?.id,
        firstName : user_data?.first_name,
        lastName : user_data?.last_name,
        role : Role.admin
      }
      return {status : 200, message : `Login Successful`, data : signInAuthDto, access_token: await this.jwtService.signAsync(payload)};
    } catch(err) {
      console.log("Error => ", err);
      throw new UnauthorizedException(`Can't Login, Something went wrong.`);
    }
  }

  async adminSignUp(signUpAuthDto : AdminSignUpAuthDto) {
    try {
      const {firstName, lastName, phone, password}: AdminSignUpAuthDto = signUpAuthDto;
      const user_data = await this.userRepository.findOne({
        where : {
          phone : phone,
          role : Role.admin
        }
      });
      if(user_data) {
        return {status : 400, message : `Admin Already Exists`, data : signUpAuthDto};
      } else {
        const user_obj : adminObjDto = {
          id : uuidv4(),
          first_name : firstName,
          last_name : lastName,
          phone : phone,
          password : password,
          role : Role.admin
        };
        await this.userRepository.save(user_obj);
        return {status : 200, message : `Admin Created Successfully`};
      }
     } catch(err) {
      console.log("Error = > ", err);
      throw new ConflictException(`Admin SignUp Failed`);
     }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: string) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
