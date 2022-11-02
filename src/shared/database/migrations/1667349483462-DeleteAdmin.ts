import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteAdmin1667349483462 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("admin");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
