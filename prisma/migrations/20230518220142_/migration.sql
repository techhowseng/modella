-- DropIndex
DROP INDEX "Media_userId_key";

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "thumbnailPublicId" TEXT,
ADD COLUMN     "thumbnailURL" TEXT;

-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "thumbnailPublicId" TEXT,
ADD COLUMN     "thumbnailURL" TEXT;
