import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteAddress1667349307843 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("address_client");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
