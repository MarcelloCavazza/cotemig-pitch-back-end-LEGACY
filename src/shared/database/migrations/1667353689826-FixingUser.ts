import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class FixingUser1667353689826 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("user", {
      name: "telephone",
      type: "varchar",
      length: "15",
      isNullable: false,
      "@instanceof": undefined,
      isGenerated: false,
      isPrimary: false,
      isUnique: false,
      isArray: false,
      zerofill: false,
      unsigned: false,
      clone: function (): TableColumn {
        throw new Error("Function not implemented.");
      },
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
