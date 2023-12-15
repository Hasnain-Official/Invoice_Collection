import { IsInt, IsNumber, IsUUID, Min } from "class-validator";

export class CreateWalletDto {
    @IsInt()
    @Min(1, {message : 'Value must be positive number greater than 0'})
    amount : number;
}

export class checkUUIDDto {
    @IsUUID('4', {message : `Invalid UUID`})
    id : string;
}