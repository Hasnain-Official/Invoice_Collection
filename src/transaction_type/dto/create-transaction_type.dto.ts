import { IsString } from "class-validator";

export class CreateTransactionTypeDto {
    @IsString()
    readonly type: string;
}
