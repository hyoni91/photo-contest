/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `password`,
    ADD COLUMN `uid` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_uid_key` ON `User`(`uid`);
