import { MigrationInterface, QueryRunner } from "typeorm";

export class CompleteTheDatabase1750017426686 implements MigrationInterface {
    name = 'CompleteTheDatabase1750017426686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" RENAME COLUMN "address" TO "tributation"`);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "logradouro" character varying(100) NOT NULL, "city" character varying(50) NOT NULL, "cep" character varying(8) NOT NULL, "complement" character varying(50) NOT NULL, "uf" character varying(2) NOT NULL, "numero" integer NOT NULL, "startDate" TIMESTAMP NOT NULL DEFAULT now(), "endDate" TIMESTAMP, "company_id" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partner" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "cpf" character varying NOT NULL, CONSTRAINT "UQ_9b05d5ef4c065154c42c0432fe0" UNIQUE ("cpf"), CONSTRAINT "PK_8f34ff11ddd5459eacbfacd48ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "revenue" ("id" SERIAL NOT NULL, "year" integer NOT NULL, "month" integer NOT NULL, "value" numeric(15,2) NOT NULL, "companyId" integer, CONSTRAINT "PK_843523949384ce16042013dacc7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."product_type_enum" AS ENUM('Produto', 'Serviço')`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "type" "public"."product_type_enum" NOT NULL, "code" character varying(20) NOT NULL, "description" character varying(200) NOT NULL, "price" numeric(11,2) NOT NULL, "companyId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cnae" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "description" character varying(200) NOT NULL, "main" boolean NOT NULL, "companyId" integer, CONSTRAINT "PK_cf14fbfe47f087c4b1dfa26cb5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact" ("id" SERIAL NOT NULL, "phone" character varying(15) NOT NULL, "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "company_id" integer, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_partners" ("partner_id" integer NOT NULL, "company_id" integer NOT NULL, CONSTRAINT "PK_aa1ff4e9d1f1d050b9cacb04438" PRIMARY KEY ("partner_id", "company_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a8cd12618f51f731b2c1da0fc2" ON "company_partners" ("partner_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_abee31d197928146db695634bb" ON "company_partners" ("company_id") `);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "company_name"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "company_name" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "commercial_name"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "commercial_name" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "tributation"`);
        await queryRunner.query(`CREATE TYPE "public"."company_tributation_enum" AS ENUM('Simples Nacional', 'Lucro Presumido', 'Lucro Real')`);
        await queryRunner.query(`ALTER TABLE "company" ADD "tributation" "public"."company_tributation_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_b8fd04c2a58474606a8fc559366" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "revenue" ADD CONSTRAINT "FK_2d47916cc4562df810823855549" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_a331e634b87a7dbba2e7fccce19" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cnae" ADD CONSTRAINT "FK_bb00bff70cb6d05f620fb40c13b" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_c631c4b71c60284b413e7214e72" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_partners" ADD CONSTRAINT "FK_a8cd12618f51f731b2c1da0fc29" FOREIGN KEY ("partner_id") REFERENCES "partner"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "company_partners" ADD CONSTRAINT "FK_abee31d197928146db695634bb5" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_partners" DROP CONSTRAINT "FK_abee31d197928146db695634bb5"`);
        await queryRunner.query(`ALTER TABLE "company_partners" DROP CONSTRAINT "FK_a8cd12618f51f731b2c1da0fc29"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_c631c4b71c60284b413e7214e72"`);
        await queryRunner.query(`ALTER TABLE "cnae" DROP CONSTRAINT "FK_bb00bff70cb6d05f620fb40c13b"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_a331e634b87a7dbba2e7fccce19"`);
        await queryRunner.query(`ALTER TABLE "revenue" DROP CONSTRAINT "FK_2d47916cc4562df810823855549"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_b8fd04c2a58474606a8fc559366"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "tributation"`);
        await queryRunner.query(`DROP TYPE "public"."company_tributation_enum"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "tributation" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "commercial_name"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "commercial_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "company_name"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "company_name" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_abee31d197928146db695634bb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a8cd12618f51f731b2c1da0fc2"`);
        await queryRunner.query(`DROP TABLE "company_partners"`);
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`DROP TABLE "cnae"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_type_enum"`);
        await queryRunner.query(`DROP TABLE "revenue"`);
        await queryRunner.query(`DROP TABLE "partner"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`ALTER TABLE "company" RENAME COLUMN "tributation" TO "address"`);
    }

}
