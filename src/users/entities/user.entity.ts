import { PrimaryGeneratedColumn } from "typeorm";

export class User {
    id: number;
    username: string;
    password: string;
}
