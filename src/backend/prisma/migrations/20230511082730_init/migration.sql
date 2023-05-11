/*
  Warnings:

  - You are about to drop the `Access` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Access";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_accessToDataset" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_accessToDataset_A_fkey" FOREIGN KEY ("A") REFERENCES "Dataset" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_accessToDataset_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_accessToDataset_AB_unique" ON "_accessToDataset"("A", "B");

-- CreateIndex
CREATE INDEX "_accessToDataset_B_index" ON "_accessToDataset"("B");
