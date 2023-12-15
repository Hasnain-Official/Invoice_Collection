import { IsString, IsPhoneNumber, IsNumber, IsPositive, Length, IsDate, IsUUID } from 'class-validator';
export class CreateInvoiceDto {
  // @IsString()
  // readonly invoice_number: string;

  @IsNumber()
  readonly total_amount: number;

  // @IsDate({message : `Invalid Date Format`})
  readonly due_date: Date;

  @IsNumber()
  readonly pending_amount: number;
}


export class checkUUIDDto {
  @IsUUID('4', {message : `Invalid UUID`})
  readonly id : string;
}