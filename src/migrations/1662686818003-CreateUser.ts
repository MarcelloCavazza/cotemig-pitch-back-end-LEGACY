import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1662686818003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "varchar",
            length: "50",
            isPrimary: true,
          },
          {
            name: "status",
            type: "enum",
            enum: ["active", "inactive"],
            isNullable: false,
          },
          {
            name: "profile",
            type: "enum",
            enum: ["admin", "client"],
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            length: "200",
            isNullable: false,
          },
          {
            name: "cpf",
            type: "varchar",
            length: "11",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            length: "150",
            isNullable: true,
          },
          {
            name: "password",
            type: "varchar",
            length: "200",
            isNullable: true,
          },
          {
            name: "telephone",
            type: "varchar",
            length: "13",
            isNullable: true,
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
    await queryRunner.dropTable("user");
  }
}
