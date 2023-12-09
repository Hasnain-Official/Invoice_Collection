import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm"
import { BaseEntity } from "src/base/base.entity";

@Entity({name : 'users', schema : 'public'})
export class User extends BaseEntity{
    @Column({ nullable: false })
    first_name: string;

    @Column({ nullable : false })
    last_name: string;

    @Column({nullable : false })
    role: string;

    @Column({nullable : false })
    phone: number;

    @Column({nullable : false})
    password : string;
}
