/*
  Warnings:

  - You are about to drop the column `locations` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "locations",
ADD COLUMN     "location" TEXT;
