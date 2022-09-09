import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAddressUser1662686839944 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "address_user",
        columns: [
          {
            name: "id",
            type: "varchar",
            length: "36",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "varchar",
            length: "36",
            isNullable: false,
          },
          {
            name: "status",
            type: "enum",
            enum: ["active", "inactive"],
            isNullable: false,
          },
          {
            name: "cep",
            type: "string",
            length: "8",
            isNullable: false,
          },
          {
            name: "city",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          {
            name: "state",
            type: "varchar",
            length: "2",
            isNullable: false,
          },
          {
            name: "number",
            type: "number",
            length: "100",
            isNullable: true,
          },
          {
            name: "district",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "street",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "addtional_info",
            type: "varchar",
            length: "250",
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
    await queryRunner.dropTable("address_user");
  }
}
