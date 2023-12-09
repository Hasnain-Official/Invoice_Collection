import { IsString, IsPhoneNumber, IsNumber, IsPositive, Length } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsNumber()
  @Length(10, 10, { message: 'Phone number must be exactly 10 digits long' })
  readonly phone: number;

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