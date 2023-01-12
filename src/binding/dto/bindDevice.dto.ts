import { IsNotEmpty } from "class-validator";
import { DeviceEntity } from "src/devices/entities/device.entity";
import { UserEntity } from "src/users/entities/user.entity";

export class BindDeviceDTO {
  
    user: UserEntity;
    @IsNotEmpty()
    device: DeviceEntity;
    @IsNotEmpty()
    local: string;
    @IsNotEmpty()
    grouping: string;

  }


