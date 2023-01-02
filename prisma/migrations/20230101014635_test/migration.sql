/*
  Warnings:

  - Changed the type of `content` on the `Media` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "provider" DROP NOT NULL,
ALTER COLUMN "provider_account_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "content",
ADD COLUMN     "content" JSONB NOT NULL;
