import { IsString, IsPhoneNumber, IsNumber, IsPositive, Length } from 'class-validator';
export class CreateTransactionDto {
  @IsString()
  readonly to: string;

  @IsString()
  readonly from: string;

  @IsNumber()
  readonly amount: number;
}

export class CreateTransactionObjDto {
    id : string;
    to: string;
    from: string;
    transactionId : string;
    amount : number;
    transaction_type_uuid : string;
    transaction_status_uuid : string;
}

export class WebhookBodyDto {
  transactionId: string;
  amount : number;
  to: string;
  from: string;
}