import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionStatusDto } from './create-transaction_status.dto';

export class UpdateTransactionStatusDto extends PartialType(CreateTransactionStatusDto) {}
