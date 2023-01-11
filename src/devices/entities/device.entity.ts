import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'device' })
export class DeviceEntity {
    @PrimaryGeneratedColumn()
    deviceId: number;

    @Column()
    DeviceName: string;
  
    @Column()
    type: string;
  
    @Column()
    maker: string;

    @Column()
    state: boolean;

    @Column()
    information: string;

    @Column()
    ipAddress: string;

    @Column()
    macAddress: string;
}
