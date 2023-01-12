import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from 'src/users/entities/user.entity';
import { DeviceEntity } from 'src/devices/entities/device.entity';

@Entity({ name: 'dispositivos_usuario' })
export class BindingEntity {
    @PrimaryGeneratedColumn()
    id_devices_user: number;
    
    @ManyToOne((type) => UserEntity, { eager: true },  )
    @JoinColumn({ name: 'userId' })
    user: UserEntity;
    
    @OneToOne((type) => DeviceEntity, { eager: true },  )
    @JoinColumn({ name: 'deviceId' })
    device: DeviceEntity;

    @Column()
    local: string;

    @Column()
    grouping: string;
}