/*
  Warnings:

  - You are about to drop the `CriteriaInDataset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DefinitionInDataset` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Annotation` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CriteriaInDataset";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DefinitionInDataset";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_DatasetToDefinition" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DatasetToDefinition_A_fkey" FOREIGN KEY ("A") REFERENCES "Dataset" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DatasetToDefinition_B_fkey" FOREIGN KEY ("B") REFERENCES "Definition" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CriteriaToDataset" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CriteriaToDataset_A_fkey" FOREIGN KEY ("A") REFERENCES "Criteria" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CriteriaToDataset_B_fkey" FOREIGN KEY ("B") REFERENCES "Dataset" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Annotation" (
    "criteriaId" INTEGER NOT NULL,
    "definitionId" INTEGER NOT NULL,
    "datasetId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("criteriaId", "definitionId", "datasetId"),
    CONSTRAINT "Annotation_criteriaId_fkey" FOREIGN KEY ("criteriaId") REFERENCES "Criteria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Annotation_definitionId_fkey" FOREIGN KEY ("definitionId") REFERENCES "Definition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Annotation_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "Dataset" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Annotation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Annotation" ("criteriaId", "datasetId", "definitionId") SELECT "criteriaId", "datasetId", "definitionId" FROM "Annotation";
DROP TABLE "Annotation";
ALTER TABLE "new_Annotation" RENAME TO "Annotation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_DatasetToDefinition_AB_unique" ON "_DatasetToDefinition"("A", "B");

-- CreateIndex
CREATE INDEX "_DatasetToDefinition_B_index" ON "_DatasetToDefinition"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CriteriaToDataset_AB_unique" ON "_CriteriaToDataset"("A", "B");

-- CreateIndex
CREATE INDEX "_CriteriaToDataset_B_index" ON "_CriteriaToDataset"("B");
