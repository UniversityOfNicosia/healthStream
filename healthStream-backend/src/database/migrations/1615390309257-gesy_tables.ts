import {MigrationInterface, QueryRunner} from "typeorm";

export class gesyTables1615390309257 implements MigrationInterface {
    name = 'gesyTables1615390309257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `lab_test_result` (`id` int NOT NULL AUTO_INCREMENT, `testCode` varchar(255) NOT NULL, `testName` varchar(255) NOT NULL, `resultValue` varchar(255) NOT NULL, `resultUnits` varchar(255) NOT NULL, `resultReferenceRange` varchar(255) NOT NULL, `resultComments` varchar(255) NULL, `activityId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `lab_activity` (`id` int NOT NULL AUTO_INCREMENT, `seqNr` varchar(255) NOT NULL, `code` varchar(255) NOT NULL, `type` enum ('PANEL', 'TEST') NOT NULL, `name` varchar(255) NOT NULL, `labTestComments` varchar(255) NULL, `labTestResultsRequired` tinyint NOT NULL, `sampleTypeName` varchar(255) NULL, `laboratoryId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `lab_beneficiary` (`id` int NOT NULL AUTO_INCREMENT, `beneficiaryId` varchar(255) NOT NULL, `beneficiaryDocType` varchar(255) NOT NULL, `beneficiaryName` varchar(255) NOT NULL, `beneficiaryLastName` varchar(255) NOT NULL, `beneficiaryGender` enum ('M', 'F', 'O') NOT NULL, `beneficiaryDOB` timestamp NOT NULL, `laboratoryId` int NULL, UNIQUE INDEX `REL_86b2e21b8a56318299dffc026f` (`laboratoryId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `lab_issuing_provider` (`id` int NOT NULL AUTO_INCREMENT, `issuingProviderId` varchar(255) NOT NULL, `issuingProviderName` varchar(255) NOT NULL, `issuingProviderLastName` varchar(255) NOT NULL, `issuingProviderWorkPhoneNumber` varchar(255) NOT NULL, `laboratoryId` int NULL, UNIQUE INDEX `REL_529ac3307631e0e3fddb7799a5` (`laboratoryId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `lab_user` (`id` int NOT NULL AUTO_INCREMENT, `userName` varchar(255) NOT NULL, `userLastName` varchar(255) NOT NULL, `userFirstName` varchar(255) NOT NULL, `userDocType` enum ('NID', 'ARC') NOT NULL, `userDocId` varchar(255) NOT NULL, `laboratoryId` int NULL, UNIQUE INDEX `REL_42a549f6ec152cdaa8805a0b4b` (`laboratoryId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `laboratory` (`id` int NOT NULL AUTO_INCREMENT, `messageType` varchar(255) NOT NULL, `timestamp` timestamp NOT NULL, `labOrderId` int NOT NULL, `relatedOrderId` int NULL, `labOrderExecutionId` int NOT NULL, `visitId` int NOT NULL, `labSystemVisitId` varchar(255) NULL, `executingProviderId` varchar(255) NOT NULL, `labOrderCategory` enum ('LABI', 'LABH', 'LABMI', 'LABB', 'LABMB', 'LABMILABI') NOT NULL, `labOrderIssueDate` timestamp NOT NULL, `labOrderEffectiveFromDate` timestamp NOT NULL, `labOrderExpiryDate` timestamp NOT NULL, `labOrderReservedOnDate` timestamp NOT NULL, `labOrderReservationExpiryDate` timestamp NOT NULL, `labOrderNotes` timestamp NULL, `beneficiaryCoPaymentAmount` decimal NOT NULL, `reimbursementPoints` decimal NOT NULL, `hasAntibiotics` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `antibiotic` (`id` int NOT NULL AUTO_INCREMENT, `antibioticCode` varchar(255) NOT NULL, `antibioticName` varchar(255) NOT NULL, `antibioticActiveIngrStrength` varchar(255) NOT NULL, `laboratoryId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` CHANGE `userName` `userName` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `lastName` `lastName` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `lastAccessAt` `lastAccessAt` timestamp NULL");
        await queryRunner.query("ALTER TABLE `lab_test_result` ADD CONSTRAINT `FK_c49f1827acb901359b835a4f954` FOREIGN KEY (`activityId`) REFERENCES `lab_activity`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `lab_activity` ADD CONSTRAINT `FK_f95a4c4f88fcda97458080f7c9a` FOREIGN KEY (`laboratoryId`) REFERENCES `laboratory`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `lab_beneficiary` ADD CONSTRAINT `FK_86b2e21b8a56318299dffc026f3` FOREIGN KEY (`laboratoryId`) REFERENCES `laboratory`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `lab_issuing_provider` ADD CONSTRAINT `FK_529ac3307631e0e3fddb7799a5a` FOREIGN KEY (`laboratoryId`) REFERENCES `laboratory`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `lab_user` ADD CONSTRAINT `FK_42a549f6ec152cdaa8805a0b4b8` FOREIGN KEY (`laboratoryId`) REFERENCES `laboratory`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `antibiotic` ADD CONSTRAINT `FK_d4294e19ac2440f029bcdf3021e` FOREIGN KEY (`laboratoryId`) REFERENCES `laboratory`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `antibiotic` DROP FOREIGN KEY `FK_d4294e19ac2440f029bcdf3021e`");
        await queryRunner.query("ALTER TABLE `lab_user` DROP FOREIGN KEY `FK_42a549f6ec152cdaa8805a0b4b8`");
        await queryRunner.query("ALTER TABLE `lab_issuing_provider` DROP FOREIGN KEY `FK_529ac3307631e0e3fddb7799a5a`");
        await queryRunner.query("ALTER TABLE `lab_beneficiary` DROP FOREIGN KEY `FK_86b2e21b8a56318299dffc026f3`");
        await queryRunner.query("ALTER TABLE `lab_activity` DROP FOREIGN KEY `FK_f95a4c4f88fcda97458080f7c9a`");
        await queryRunner.query("ALTER TABLE `lab_test_result` DROP FOREIGN KEY `FK_c49f1827acb901359b835a4f954`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `lastAccessAt` `lastAccessAt` timestamp NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `user` CHANGE `lastName` `lastName` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `user` CHANGE `userName` `userName` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("DROP TABLE `antibiotic`");
        await queryRunner.query("DROP TABLE `laboratory`");
        await queryRunner.query("DROP INDEX `REL_42a549f6ec152cdaa8805a0b4b` ON `lab_user`");
        await queryRunner.query("DROP TABLE `lab_user`");
        await queryRunner.query("DROP INDEX `REL_529ac3307631e0e3fddb7799a5` ON `lab_issuing_provider`");
        await queryRunner.query("DROP TABLE `lab_issuing_provider`");
        await queryRunner.query("DROP INDEX `REL_86b2e21b8a56318299dffc026f` ON `lab_beneficiary`");
        await queryRunner.query("DROP TABLE `lab_beneficiary`");
        await queryRunner.query("DROP TABLE `lab_activity`");
        await queryRunner.query("DROP TABLE `lab_test_result`");
    }

}
