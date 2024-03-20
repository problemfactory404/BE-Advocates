import { Users } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

export enum Order {
    ZERO = '0',
    ONE = '1',
    TWO = '2',
    THREE = '3'
}

@Entity()
export class Case_Dates {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    case_id: number;

    @Column()
    case_date: Date;

    @Column({
        type: 'enum',
        enum: Order,
        default: Order.ZERO,
    })
    order?: string;

    @Column({ default: '' })
    payment: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    updated_by: number;

    @Column()
    created_by: number;
}
