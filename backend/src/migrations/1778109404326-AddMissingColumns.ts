import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMissingColumns1778109404326 implements MigrationInterface {
    name = 'AddMissingColumns1778109404326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`member_session\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`refreshToken\` varchar(255) NOT NULL, \`expiredAt\` datetime NOT NULL, \`memberId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`member\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`member\` ADD \`lastAccessedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`member_session\` ADD CONSTRAINT \`FK_05b31a13081704426fa52872e8a\` FOREIGN KEY (\`memberId\`) REFERENCES \`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`member_session\` DROP FOREIGN KEY \`FK_05b31a13081704426fa52872e8a\``);
        await queryRunner.query(`ALTER TABLE \`member\` DROP COLUMN \`lastAccessedAt\``);
        await queryRunner.query(`ALTER TABLE \`member\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`DROP TABLE \`member_session\``);
    }

}
