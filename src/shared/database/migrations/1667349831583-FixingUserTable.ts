import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class FixingUserTable1667349831583 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("client");
    await queryRunner.dropTable("lawyer");
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
            length: "14",
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
            name: "seccional",
            type: "enum",
            enum: [
              "AC",
              "AL",
              "AP",
              "AM",
              "BA",
              "CE",
              "DF",
              "ES",
              "GO",
              "MA",
              "MT",
              "MS",
              "MG",
              "PA",
              "PB",
              "PR",
              "PE",
              "PI",
              "RJ",
              "RN",
              "RS",
              "RO",
              "RR",
              "SC",
              "SP",
              "SE",
              "TO",
              "Todas",
            ],
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
    await queryRunner.createTable(
      new Table({
        name: "lawyer",
        columns: [
          {
            name: "id",
            type: "varchar",
            length: "50",
            isPrimary: true,
          },
          {
            name: "user_id",
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
            name: "oab_number",
            type: "varchar",
            length: "8",
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
    await queryRunner.dropTable("user");
    await queryRunner.dropTable("lawyer");
  }
}
