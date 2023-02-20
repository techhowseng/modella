-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Contract" ALTER COLUMN "locations" DROP NOT NULL,
ALTER COLUMN "locations" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "locations" DROP NOT NULL,
ALTER COLUMN "locations" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Model" ALTER COLUMN "phone" SET DATA TYPE TEXT;