import {MigrationInterface, QueryRunner} from "typeorm";

export class user1615219321086 implements MigrationInterface {
    name = 'user1615219321086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `userName` varchar(255) NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NULL, `email` varchar(255) NOT NULL, `enabled` tinyint NOT NULL DEFAULT 1, `lastAccessAt` timestamp NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query("DROP TABLE `user`");
    }

}
