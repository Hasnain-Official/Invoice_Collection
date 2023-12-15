import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm"
import { BaseEntity } from "src/base/base.entity";
import { Invoice } from "src/invoice/entities/invoice.entity";

@Entity({name : 'transaction_statuses', schema : 'public'})
export class TransactionStatus extends BaseEntity{
    @Column({ nullable: false })
    status: string;

    @OneToMany(type => Invoice, invoice => invoice.status)
    @JoinColumn({
        name : 'id',
        referencedColumnName : 'status_uuid'
    })
    invoice : Invoice[];
}
