import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserTable1639416224206 implements MigrationInterface {
  name = 'createUserTable1639416224206';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying, "sender" character varying, "receiver" character varying, "isRead" boolean NOT NULL DEFAULT false, "content" text NOT NULL, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userName" character varying, "firstname" character varying, "lastname" character varying, "pin" character varying, "verified" boolean NOT NULL DEFAULT false, "referredBy" character varying, "referralCode" character varying, "countryCode" character varying, "dateOfBirth" date, "userAvatar" character varying, "phone" character varying NOT NULL, "deviceHash" text, "lastLogin" text, CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "notifications"`);
  }
}
