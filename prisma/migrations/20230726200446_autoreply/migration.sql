/*
  Warnings:

  - You are about to drop the column `body` on the `autoreply` table. All the data in the column will be lost.
  - Added the required column `receive` to the `autoreply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `autoreply` DROP COLUMN `body`,
    ADD COLUMN `receive` VARCHAR(191) NOT NULL;
