import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class UpdateUser1667744529483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
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
            name: "is_active",
            type: "enum",
            enum: ["active", "inactive"],
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
            length: "15",
            isNullable: false,
          },
          {
            name: "telephone",
            type: "varchar",
            length: "20",
            isNullable: false,
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
            name: "state",
            type: "varchar",
            length: "3",
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
            onUpdate: "now()",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
