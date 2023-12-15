import { SetMetadata } from '@nestjs/common';
export const jwtConstants = {
    secret: 'INVOICE_COLLECTION',
};

export const transactionStatus = {
    pending: 'Pending',
    completed: 'Completed'
}

export const transactionTypes = {
    pending: 'Pending',
    completed: 'Completed'
}


export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);