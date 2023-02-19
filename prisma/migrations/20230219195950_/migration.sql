/*
  Warnings:

  - You are about to drop the column `DOB` on the `Model` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Model" DROP COLUMN "DOB",
ADD COLUMN     "dob" TIMESTAMP(3);
