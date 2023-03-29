/*
  Warnings:

  - Added the required column `address` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `social` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "social" JSONB NOT NULL,
ADD COLUMN     "state" TEXT;
