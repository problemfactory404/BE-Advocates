import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { IsNotEmpty } from "class-validator";

export enum UserRole {
    ADMIN = 'admin',
    SUBADMIN = 'subadmin',
    USER = 'user'
}

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    phoneNumber: string;

    @Column({ unique: true })
    email: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.SUBADMIN,
    })
    role?: string;

    @Column()
    address: string;

    @Column()
    identity_no: string;

    @Column()
    vehicle_no: string;

    @Column()
    @UpdateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    update_at: Date;

    @Column({ default: 0 })
    updated_by: number;

    @Column({ default: false })
    isLoggedIn: boolean;

    @Column()
    @IsNotEmpty()
    password: string

    @Column({ default: '' })
    status?: string;
    // @BeforeInsert()
    // async hashPassword() {
    //     this.password = await bcrypt.hash(this.password, 8);
    // }

    // async validatePassword(password: string): Promise<boolean> {
    //     return bcrypt.compare(password, this.password);
    // }
}