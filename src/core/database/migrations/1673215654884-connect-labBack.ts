import { MigrationInterface, QueryRunner } from "typeorm";

export class connectLabBack1673215654884 implements MigrationInterface {
    name = 'connectLabBack1673215654884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "UserAdress" ("userAddressId" SERIAL NOT NULL, "CEP" character varying NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "number" character varying NOT NULL, "neighborhood" character varying NOT NULL, "state" character varying NOT NULL, "complemento" character varying NOT NULL, CONSTRAINT "PK_203f9591e0edf42e2651341f9d1" PRIMARY KEY ("userAddressId"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(50) NOT NULL, "phone" character varying(20) NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "userAddressId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "REL_30f4cf4e44767307f6c1a1d183" UNIQUE ("userAddressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_30f4cf4e44767307f6c1a1d183f" FOREIGN KEY ("userAddressId") REFERENCES "UserAdress"("userAddressId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_30f4cf4e44767307f6c1a1d183f"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "UserAdress"`);
    }

}
