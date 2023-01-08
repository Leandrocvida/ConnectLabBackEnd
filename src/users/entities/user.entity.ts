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
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 20, unique: true })
  phone: string;

  @Column({ nullable: false })
  password: string;

  @OneToOne((type) => UserAddressEntity, { eager: true, cascade: true })
  @JoinColumn({ name: 'userAddressId' })
  UserAddress: UserAddressEntity;

  @Column({ nullable: false })
  salt: string;

  @Column({ type: 'varchar', length: 64 })
  confirmationToken: string;

  @Column({ type: 'varchar', length: 64 })
  recoverToken: string;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
