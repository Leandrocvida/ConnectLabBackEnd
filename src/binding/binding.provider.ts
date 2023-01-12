import { DataSource } from 'typeorm';
import { BindingEntity } from './entities/binding.entity';

export const bindingProvider = [
  {
    provide: 'BINDING_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(BindingEntity),
    inject: ['DATA_SOURCE'],
  },
];