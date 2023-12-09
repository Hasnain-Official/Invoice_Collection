import { Column, Entity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, PrimaryColumn, Generated } from 'typeorm'
class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
  
    @CreateDateColumn()
    public created_at?: Date | string
  
  
    @UpdateDateColumn()
    public updated_at?: Date | string
  
    @Column({ default: null, nullable: true })
    public deleted_at?: Date
  }

  enum Role {
    user = 'user',
    admin = 'admin'
  }

  export {
    BaseEntity,
    Role
  }