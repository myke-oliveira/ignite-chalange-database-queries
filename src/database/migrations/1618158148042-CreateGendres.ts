import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateGendres1618158148042 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "genders",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "descrition",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()"
          },
        ],
      })
    );
    await queryRunner.createTable(
      new Table({
        name: "games_genders",
        columns: [
          {
            name: "game_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "gender_id",
            type: "uuid",
            isPrimary: true,
          },
        ],
      })
    );
    await queryRunner.createForeignKey("games_genders", new TableForeignKey({
      columnNames: ["game_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "games",
      onDelete: "CASCADE",
      name: "gender_has_games"
    }));
    await queryRunner.createForeignKey("games_genders", new TableForeignKey({
      columnNames: ["gender_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "genders",
      onDelete: "CASCADE",
      name: "game_has_genders"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("games_genders", "game_has_genders");
    await queryRunner.dropForeignKey("games_genders", "gender_has_games");
    await queryRunner.dropTable("games_genders");
    await queryRunner.dropTable("genders");
  }

}
