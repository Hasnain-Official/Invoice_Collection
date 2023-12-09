import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEntity } from './base.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([BaseEntity])
    ],
    providers: [],
    exports: []
})
export class BaseModule { }
