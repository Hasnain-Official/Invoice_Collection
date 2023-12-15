import { IsString, IsPhoneNumber, IsNumber, IsPositive, Length } from 'class-validator';
export class CreateTransactionStatusDto {
    @IsString()
    readonly status: string;
}