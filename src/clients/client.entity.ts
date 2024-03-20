import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

export enum Role {
    ADMIN='Admin',
    SUBADMIN='SubAdmin',
    USER='User'
}

@Entity()
export class Clients {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    case_id: number;

    @Column({ default: '' })
    first_name: string

    @Column({ default: '' })
    last_name: string

    @Column({ default: '' })
    mobile: string

    @Column({ default: '' })
    email: string

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.SUBADMIN,
    })
    role?: string;

    @Column({ default: '' })
    address: string

    @Column({ default: '' })
    identity_no: string;

    @Column({ default: '' })
    vehicle_no: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    updated_by: number;
}
