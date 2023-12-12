import { IsNumber, IsPositive, IsString, Length } from "class-validator";

export class UserSignInAuthDto {
    @IsString()
    @Length(10,10, { message: 'Phone number must be exactly 10 digits long' })
    readonly phone: string;

    @IsString()
    @Length(6, 100, { message: 'Password must be greater than 6 digits long' })
    readonly password: string;
}

export class UserSignUpAuthDto {
    @IsString()
    readonly firstName: string;
  
    @IsString()
    readonly lastName: string;
  
    @IsString()
    @Length(10, 10, { message: 'Phone number must be exactly 10 digits long' })
    readonly phone: string;
  
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

export class AdminSignInAuthDto {
    @IsString()
    @Length(10, 10, { message: 'Phone number must be exactly 10 digits long' })
    readonly phone: string;

    @IsString()
    @Length(6, 100, { message: 'Password must be greater than 6 digits long' })
    readonly password: string;
}

export class AdminSignUpAuthDto {
    @IsString()
    readonly firstName: string;
  
    @IsString()
    readonly lastName: string;
  
    @IsString()
    @Length(10, 10, { message: 'Phone number must be exactly 10 digits long' })
    readonly phone: string;
  
    // @IsNumber()
    // @IsPositive()
    // readonly walletBalance: number;
  
    // @IsString()
    // readonly cardNumber: string;
  
    // @IsString()
    // readonly ifscCode: string;
  
    // @IsString()
    // readonly bankName: string;
  
     @IsString()
     readonly password: string;
}

export class userObjDto {
    id : string;
    first_name : string;
    last_name: string;
    phone : string;
    password : string;
    role : string;
}

export class walletObjDto {
    id : string;
    card_number : string;
    bank_name: string;
    ifsc_code : string;
    user_uuid: string;
    amount: number;
}

export class adminObjDto {
    id : string;
    first_name : string;
    last_name: string;
    phone : string;
    password : string;
    role : string;
}