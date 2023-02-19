/*
  Warnings:

  - The `startDate` column on the `Contract` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `startTime` column on the `Contract` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `hours` column on the `Contract` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `days` column on the `Contract` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fee` column on the `Contract` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `height` column on the `Model` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bust` column on the `Model` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `waist` column on the `Model` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `hip` column on the `Model` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `shoeSize` column on the `Model` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `weight` column on the `Model` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `DOB` column on the `Model` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "startDate",
ADD COLUMN     "startDate" TIMESTAMP(3),
DROP COLUMN "startTime",
ADD COLUMN     "startTime" TIMESTAMP(3),
DROP COLUMN "hours",
ADD COLUMN     "hours" INTEGER,
DROP COLUMN "days",
ADD COLUMN     "days" INTEGER,
DROP COLUMN "fee",
ADD COLUMN     "fee" DECIMAL(9,2);

-- AlterTable
ALTER TABLE "Model" DROP COLUMN "height",
ADD COLUMN     "height" INTEGER,
DROP COLUMN "bust",
ADD COLUMN     "bust" INTEGER,
DROP COLUMN "waist",
ADD COLUMN     "waist" INTEGER,
DROP COLUMN "hip",
ADD COLUMN     "hip" INTEGER,
DROP COLUMN "shoeSize",
ADD COLUMN     "shoeSize" INTEGER,
DROP COLUMN "weight",
ADD COLUMN     "weight" DECIMAL(4,1),
DROP COLUMN "DOB",
ADD COLUMN     "DOB" TIMESTAMP(3);
