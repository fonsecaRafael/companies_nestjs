import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCompaniesTable1749742569227 implements MigrationInterface {
    name = 'CreateCompaniesTable1749742569227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."company_legal_nature_enum" AS ENUM('MEI', 'LTDA', 'S/A', 'EIRELI')`);
        await queryRunner.query(`CREATE TYPE "public"."company_size_enum" AS ENUM('Microempresa', 'Pequena Empresa', 'Média Empresa', 'Grande Empresa')`);
        await queryRunner.query(`CREATE TYPE "public"."company_status_enum" AS ENUM('Ativa', 'Inativa', 'Suspensa')`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "cnpj" character varying NOT NULL, "company_name" character varying NOT NULL, "commercial_name" character varying NOT NULL, "address" character varying NOT NULL, "founding_date" date NOT NULL, "capital_social" numeric(15,2) NOT NULL, "legal_nature" "public"."company_legal_nature_enum" NOT NULL, "size" "public"."company_size_enum" NOT NULL, "status" "public"."company_status_enum" NOT NULL, "status_date" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_b55d9c6e6adfa3c6de735c5a2eb" UNIQUE ("cnpj"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TYPE "public"."company_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."company_size_enum"`);
        await queryRunner.query(`DROP TYPE "public"."company_legal_nature_enum"`);
    }

}
