import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm"
import { BaseEntity } from "src/base/base.entity";

@Entity({name : 'transaction_statuses', schema : 'public'})
export class TransactionStatus extends BaseEntity{
    @Column({ nullable: false })
    status: string;
}
