import { MigrationInterface, QueryRunner } from "typeorm";

export class EnableSoftDeletes1750293888456 implements MigrationInterface {
    name = 'EnableSoftDeletes1750293888456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "contact" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "revenue" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "product" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "cnae" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "partner" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partner" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "cnae" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "revenue" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "deletedAt"`);
    }

}
