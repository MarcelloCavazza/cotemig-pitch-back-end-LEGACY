import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChatMessage1665516588195 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "chat_message",
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
            name: "message_content",
            type: "varchar",
            length: "250",
            isNullable: false,
          },

          {
            name: "chat_id",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          {
            name: "sender_id",
            type: "varchar",
            length: "50",
            isNullable: false,
            default: "false",
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
    await queryRunner.dropTable("chat_message");
  }
}
