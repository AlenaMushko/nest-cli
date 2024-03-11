import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1708962622561 implements MigrationInterface {
    name = 'FirstMigration1708962622561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "age" integer`);
    }

}
