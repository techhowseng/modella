/*
  Warnings:

  - The primary key for the `Contract` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Job` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Messages` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_JobToModel" DROP CONSTRAINT "_JobToModel_A_fkey";

-- AlterTable
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Contract_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Contract_id_seq";

-- AlterTable
ALTER TABLE "Job" DROP CONSTRAINT "Job_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Job_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Job_id_seq";

-- AlterTable
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Messages_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Messages_id_seq";

-- AlterTable
ALTER TABLE "_JobToModel" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_JobToModel" ADD CONSTRAINT "_JobToModel_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
