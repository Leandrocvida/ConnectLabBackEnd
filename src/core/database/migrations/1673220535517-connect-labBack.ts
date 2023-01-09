import { MigrationInterface, QueryRunner } from "typeorm";

export class connectLabBack1673220535517 implements MigrationInterface {
    name = 'connectLabBack1673220535517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userName" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "photoURL" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "photoURL"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userName"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(100) NOT NULL`);
    }

}
