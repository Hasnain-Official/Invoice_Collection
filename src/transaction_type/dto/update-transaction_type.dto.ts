import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionTypeDto } from './create-transaction_type.dto';

export class UpdateTransactionTypeDto extends PartialType(CreateTransactionTypeDto) {}
