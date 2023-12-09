import { IsString, IsPhoneNumber, IsNumber, IsPositive, Length } from 'class-validator';
export class CreateTransactionDto {
  @IsString()
  readonly to: string;

  @IsString()
  readonly from: string;

  @IsNumber()
  readonly amount: number;
}