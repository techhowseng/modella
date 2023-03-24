/*
  Warnings:

  - You are about to drop the column `clientMessages` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the column `modelMessages` on the `Messages` table. All the data in the column will be lost.
  - Added the required column `clientMessage` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelMessage` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "clientMessages",
DROP COLUMN "modelMessages",
ADD COLUMN     "clientMessage" TEXT NOT NULL,
ADD COLUMN     "modelMessage" TEXT NOT NULL;
