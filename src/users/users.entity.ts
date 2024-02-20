import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column({unique: true})
    phoneNumber: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string

    @Column()
    @UpdateDateColumn()
    updateAt: Date;

    @Column({ default: false })
    isLoggedIn: boolean;
    // @BeforeInsert()
    // async hashPassword() {
    //     this.password = await bcrypt.hash(this.password, 8);
    // }

    // async validatePassword(password: string): Promise<boolean> {
    //     return bcrypt.compare(password, this.password);
    // }
}