import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'connectlab.UserAdress' })
export class UserAddressEntity {
  @PrimaryGeneratedColumn()
  addressId: number;

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
