import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm"
import { BaseEntity } from "src/base/base.entity";

@Entity({name : 'transaction_types', schema : 'public'})
export class TransactionType extends BaseEntity{
    @Column({ nullable: false })
    type: string;
}
