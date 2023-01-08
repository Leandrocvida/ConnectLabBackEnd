import {
  Column,
  OneToOne,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserAddressEntity } from './address.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  userName: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 20, unique: true })
  phone: string;

  @Column({ nullable: false })
  password: string;

  @Column({ length: 100 })
  photoURL: string;

  @OneToOne(() => UserAddressEntity, { eager: true, cascade: true })
  @JoinColumn({ name: 'userAddressId' })
  userAddress: UserAddressEntity;

  @Column({ nullable: false })
  salt: string;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
