-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "_JobToModel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JobToModel_AB_unique" ON "_JobToModel"("A", "B");

-- CreateIndex
CREATE INDEX "_JobToModel_B_index" ON "_JobToModel"("B");

-- AddForeignKey
ALTER TABLE "_JobToModel" ADD CONSTRAINT "_JobToModel_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToModel" ADD CONSTRAINT "_JobToModel_B_fkey" FOREIGN KEY ("B") REFERENCES "Model"("id") ON DELETE CASCADE ON UPDATE CASCADE;
