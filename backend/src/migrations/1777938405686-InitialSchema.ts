import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1777938405686 implements MigrationInterface {
  name = 'InitialSchema1777938405686';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`member\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`email\` varchar(255) NOT NULL, \`nickname\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`UQ_MEMBER_NICKNAME\` (\`nickname\`), UNIQUE INDEX \`UQ_MEMBER_EMAIL\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`UQ_MEMBER_EMAIL\` ON \`member\``);
    await queryRunner.query(`DROP INDEX \`UQ_MEMBER_NICKNAME\` ON \`member\``);
    await queryRunner.query(`DROP TABLE \`member\``);
  }
}
