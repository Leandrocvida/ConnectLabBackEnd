import { DataSource } from 'typeorm';
import { DeviceEntity } from './entities/device.entity';

export const deviceProvider = [
  {
    provide: 'DEVICE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DeviceEntity),
    inject: ['DATA_SOURCE'],
  },
];
