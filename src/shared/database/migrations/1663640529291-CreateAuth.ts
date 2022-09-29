import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAuth1663640529291 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "auth",
        columns: [
          {
            name: "id",
            type: "varchar",
            length: "50",
            isPrimary: true,
          },
          {
            name: "is_active",
            type: "enum",
            enum: ["active", "inactive"],
            isNullable: false,
          },
          {
            name: "token",
            type: "varchar",
            length: "200",
            isNullable: false,
          },
          {
            name: "is_admin",
            type: "varchar",
            length: "5",
            isNullable: false,
            default: "false",
          },
          {
            name: "email",
            type: "varchar",
            length: "150",
            isNullable: false,
          },
          {
            name: "password",
            type: "varchar",
            length: "200",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: false,
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("auth");
  }
}
