import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm"
import { BaseEntity } from "src/base/base.entity";

@Entity({name : 'transactions', schema : 'public'})
export class Transaction extends BaseEntity{
    @Column({ type: 'uuid', nullable: false })
    to: string;

    @Column({ type: 'uuid', nullable: false })
    from: string;

    @Column({ nullable: false })
    transactionId: string;

    @Column({ nullable : false })
    amount: number;

    @Column({ type: 'uuid', nullable: false })
    transaction_type_uuid: string;

    @Column({ type: 'uuid', nullable: false })
    transaction_status_uuid: string;
}
