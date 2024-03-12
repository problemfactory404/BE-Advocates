import { Users } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Cases {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  case_no: number;

  @Column()
  section: string;

  @Column({ default: '' })
  versus: string;

  @Column({ default: '' })
  case_file_date: string;

  @Column({ default: '' })
  case_status: string;

  @Column()
  present_date: Date;

  @Column()
  last_date: Date;

  @Column({ default: 0 })
  case_order_status: number;

  @Column()
  updated_by: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @ManyToOne(() => Users, (user) => user.id)
  // user: Users
}
