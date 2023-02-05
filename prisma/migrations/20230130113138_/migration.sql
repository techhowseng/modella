/*
  Warnings:

  - You are about to drop the `ClientJobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContractedModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ModelHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClientJobs" DROP CONSTRAINT "ClientJobs_clientId_fkey";

-- DropForeignKey
ALTER TABLE "ContractedModel" DROP CONSTRAINT "ContractedModel_clientId_fkey";

-- DropForeignKey
ALTER TABLE "ContractedModel" DROP CONSTRAINT "ContractedModel_modelId_fkey";

-- DropForeignKey
ALTER TABLE "ModelHistory" DROP CONSTRAINT "ModelHistory_modelId_fkey";

-- DropTable
DROP TABLE "ClientJobs";

-- DropTable
DROP TABLE "ContractedModel";

-- DropTable
DROP TABLE "ModelHistory";

-- CreateTable
CREATE TABLE "Contracts" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Ongoing',
    "locations" JSONB NOT NULL,
    "startDate" TEXT,
    "startTime" TEXT,
    "hours" TEXT,
    "days" TEXT,
    "fee" TEXT,

    CONSTRAINT "Contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "modelId" INTEGER NOT NULL,
    "job" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jobs" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "jobRole" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "salary" TEXT,
    "jobType" TEXT,
    "jobLength" TEXT,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contracts" ADD CONSTRAINT "Contracts_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contracts" ADD CONSTRAINT "Contracts_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
