import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm"
import { BaseEntity } from "src/base/base.entity";

@Entity({name : 'wallets', schema : 'public'})
export class Wallet extends BaseEntity{
    @Column({ nullable: false })
    amount: number;

    @Column({ nullable : false })
    card_number: string;

    @Column({nullable : false })
    bank_name: string;

    @Column({nullable : false })
    ifsc_code: string;

    @Column({type : 'uuid', nullable : false})
    user_uuid: string;
}
