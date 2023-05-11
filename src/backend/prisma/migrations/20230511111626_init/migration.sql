/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Dataset` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dataset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Dataset" ("id", "name") SELECT "id", "name" FROM "Dataset";
DROP TABLE "Dataset";
ALTER TABLE "new_Dataset" RENAME TO "Dataset";
CREATE UNIQUE INDEX "Dataset_name_key" ON "Dataset"("name");
CREATE TABLE "new_Access" (
    "userId" INTEGER NOT NULL,
    "datasetId" INTEGER NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',

    PRIMARY KEY ("userId", "datasetId"),
    CONSTRAINT "Access_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Access_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "Dataset" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Access" ("datasetId", "userId") SELECT "datasetId", "userId" FROM "Access";
DROP TABLE "Access";
ALTER TABLE "new_Access" RENAME TO "Access";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
