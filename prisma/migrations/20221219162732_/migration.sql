/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('MODEL', 'CLIENT');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('SIGNUP', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ONGOING', 'DONE');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('DEFAULT', 'PROFILE', 'GALLERY', 'MISC');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "counter" SERIAL NOT NULL,
ADD COLUMN     "isAuthenticated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'MODEL',
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "UserToken" (
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "tokenType" "TokenType" NOT NULL
);

-- CreateTable
CREATE TABLE "Model" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "age" INTEGER,
    "height" TEXT,
    "DOB" TEXT,
    "social" JSONB NOT NULL,
    "state" TEXT,
    "country" TEXT,
    "address" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "bio" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" JSONB NOT NULL,
    "social" JSONB NOT NULL,
    "state" TEXT,
    "country" TEXT,
    "address" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "contractedModel" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ONGOING'
);

-- CreateTable
CREATE TABLE "modelHistory" (
    "id" SERIAL NOT NULL,
    "modelId" INTEGER NOT NULL,
    "job" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "clientJobs" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "jobRole" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "salary" TEXT,
    "jobType" TEXT,
    "jobLength" TEXT
);

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "content" JSONB[],
    "ContentType" "ContentType" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserToken_userId_key" ON "UserToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserToken_token_key" ON "UserToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Model_id_key" ON "Model"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Model_userId_key" ON "Model"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_id_key" ON "Client"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Client_userId_key" ON "Client"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "contractedModel_id_key" ON "contractedModel"("id");

-- CreateIndex
CREATE UNIQUE INDEX "modelHistory_id_key" ON "modelHistory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "clientJobs_id_key" ON "clientJobs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Media_id_key" ON "Media"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Media_userId_key" ON "Media"("userId");

-- AddForeignKey
ALTER TABLE "UserToken" ADD CONSTRAINT "UserToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractedModel" ADD CONSTRAINT "contractedModel_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractedModel" ADD CONSTRAINT "contractedModel_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modelHistory" ADD CONSTRAINT "modelHistory_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientJobs" ADD CONSTRAINT "clientJobs_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
