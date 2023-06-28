/*
  Warnings:

  - You are about to drop the `_accessToDataset` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_accessToDataset";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Access" (
    "userId" INTEGER NOT NULL,
    "datasetId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "datasetId"),
    CONSTRAINT "Access_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Access_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "Dataset" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
