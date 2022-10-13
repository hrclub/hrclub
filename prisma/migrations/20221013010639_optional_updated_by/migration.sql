-- DropForeignKey
ALTER TABLE `permissions` DROP FOREIGN KEY `permissions_updatedBy_fkey`;

-- DropForeignKey
ALTER TABLE `roles` DROP FOREIGN KEY `roles_updatedBy_fkey`;

-- AlterTable
ALTER TABLE `permissions` MODIFY `updatedBy` INTEGER NULL;

-- AlterTable
ALTER TABLE `roles` MODIFY `updatedBy` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `permissions` ADD CONSTRAINT `permissions_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roles` ADD CONSTRAINT `roles_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
