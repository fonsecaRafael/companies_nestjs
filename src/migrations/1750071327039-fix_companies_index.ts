import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCompaniesIndex1750071327039 implements MigrationInterface {
    name = 'FixCompaniesIndex1750071327039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_b55d9c6e6adfa3c6de735c5a2eb"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_905e95f1e8eb09788b284f0050" ON "company" ("cnpj") WHERE "deletedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_905e95f1e8eb09788b284f0050"`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_b55d9c6e6adfa3c6de735c5a2eb" UNIQUE ("cnpj")`);
    }

}
