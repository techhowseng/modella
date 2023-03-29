/*
  Warnings:

  - You are about to drop the column `address` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `social` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "address",
DROP COLUMN "country",
DROP COLUMN "phone",
DROP COLUMN "social",
DROP COLUMN "state",
ADD COLUMN     "clientDescription" TEXT,
ADD COLUMN     "shortDescription" TEXT;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "experience" TEXT;
