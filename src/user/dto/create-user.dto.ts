// user.dto.ts
import { IsString, IsPhoneNumber, IsNumber, IsPositive, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsNumber()
  @Length(10, 10, { message: 'Phone number must be exactly 10 digits long' })
  readonly phone: number;

  @IsNumber()
  @IsPositive()
  readonly walletBalance: number;

  @IsString()
  readonly cardNumber: string;

  @IsString()
  readonly ifscCode: string;

  @IsString()
  readonly bankName: string;

   @IsString()
   readonly password: string;
}

export class LoginDto {

    @IsNumber()
    @Length(10, 10, { message: 'Phone number must be exactly 10 digits long' })
    readonly phone: number;

    @IsString()
    readonly password: string;
}