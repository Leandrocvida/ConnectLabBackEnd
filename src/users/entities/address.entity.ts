import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'UserAdress' })
export class UserAddressEntity {
  @PrimaryGeneratedColumn()
  userAddressId: number;

  @Column()
  CEP: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  number: string;

  @Column()
  neighborhood: string;

  @Column()
  state: string;

  @Column()
  complemento: string | null;
}
