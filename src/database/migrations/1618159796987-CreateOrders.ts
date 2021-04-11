import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateOrders1618159796987 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createTable(new Table({
      name: "orders_games",
      columns: [
        {
          name: "order_id",
          type: "uuid"
        },
        {
          name: "game_id",
          type: "uuid"
        }
      ]
    }));

    await queryRunner.createForeignKey(
      "orders_games",
      new TableForeignKey({
        columnNames: ["order_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "orders",
        onDelete: "CASCADE",
        name: "order_reference"
      })
    );

    await queryRunner.createForeignKey("orders_games", new TableForeignKey({
      columnNames: ["game_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "games",
      onDelete: "CASCADE",
      name: "order_has_games"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("orders_games", "order_has_games");
    await queryRunner.dropForeignKey("orders_games", "order_reference");
    await queryRunner.dropTable("orders_games");
    await queryRunner.dropTable("orders");
  }

}
