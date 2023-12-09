import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm"
import { BaseEntity } from "src/base/base.entity";

@Entity({name : 'invoices', schema : 'public'})
export class Invoice extends BaseEntity{
    @Column({ nullable: false })
    invoiceNumber: string;

    @Column({ nullable : false })
    total_amount: number;

    @Column({nullable : false })
    due_date: Date;

    @Column({nullable : false })
    pendingAmount: number;

    @Column({ type: 'uuid', nullable: false })
    status_uuid: string;
}
