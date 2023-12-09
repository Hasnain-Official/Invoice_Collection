import { IsString, IsPhoneNumber, IsNumber, IsPositive, Length, IsDate } from 'class-validator';
export class CreateInvoiceDto {
  @IsString()
  readonly invoice_number: string;

  @IsNumber()
  readonly total_amount: number;

  @IsDate()
  readonly due_date: Date;

  @IsNumber()
  readonly pending_amount: number;
}
