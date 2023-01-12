import { IsNotEmpty } from "class-validator";
import { DeviceEntity } from "src/devices/entities/device.entity";
import { UserEntity } from "src/users/entities/user.entity";

export class BindDeviceDTO {
    @IsNotEmpty()
    user: UserEntity;
    @IsNotEmpty()
    device: DeviceEntity;
    @IsNotEmpty()
    local: string;
    @IsNotEmpty()
    grouping: string;

  }


