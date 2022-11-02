import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAuth1667349093534 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("auth", "is_admin");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
