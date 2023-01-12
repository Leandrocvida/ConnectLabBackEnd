import { MigrationInterface, QueryRunner } from "typeorm";

export class connectLabBack1673534190609 implements MigrationInterface {
    name = 'connectLabBack1673534190609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "device" ("deviceId" SERIAL NOT NULL, "DeviceName" character varying NOT NULL, "type" character varying NOT NULL, "maker" character varying NOT NULL, "state" boolean NOT NULL, "information" character varying NOT NULL, "ipAddress" character varying NOT NULL, "macAddress" character varying NOT NULL, CONSTRAINT "PK_6fe2df6e1c34fc6c18c786ca26e" PRIMARY KEY ("deviceId"))`);
        await queryRunner.query(`CREATE TABLE "dispositivos_usuario" ("id_devices_user" SERIAL NOT NULL, "local" character varying NOT NULL, "grouping" character varying NOT NULL, "userId" integer, "deviceId" integer, CONSTRAINT "REL_b84f4ad6308280582c96172d9a" UNIQUE ("deviceId"), CONSTRAINT "PK_6a35a34c0d9ce63d27e512ab985" PRIMARY KEY ("id_devices_user"))`);
        await queryRunner.query(`ALTER TABLE "dispositivos_usuario" ADD CONSTRAINT "FK_c1bf0c1d7705776725cff8e68bb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dispositivos_usuario" ADD CONSTRAINT "FK_b84f4ad6308280582c96172d9ac" FOREIGN KEY ("deviceId") REFERENCES "device"("deviceId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dispositivos_usuario" DROP CONSTRAINT "FK_b84f4ad6308280582c96172d9ac"`);
        await queryRunner.query(`ALTER TABLE "dispositivos_usuario" DROP CONSTRAINT "FK_c1bf0c1d7705776725cff8e68bb"`);
        await queryRunner.query(`DROP TABLE "dispositivos_usuario"`);
        await queryRunner.query(`DROP TABLE "device"`);
    }

}
