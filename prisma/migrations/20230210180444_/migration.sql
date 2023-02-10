/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Model" ALTER COLUMN "complexion" DROP NOT NULL,
ALTER COLUMN "isAvailable" DROP NOT NULL,
ALTER COLUMN "bio" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailVerified";
