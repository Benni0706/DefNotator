/*
  Warnings:

  - The primary key for the `Annotation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `applies` to the `Annotation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Annotation" (
    "criteriaId" INTEGER NOT NULL,
    "definitionId" INTEGER NOT NULL,
    "datasetId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "applies" BOOLEAN NOT NULL,

    PRIMARY KEY ("criteriaId", "definitionId", "datasetId", "userId"),
    CONSTRAINT "Annotation_criteriaId_fkey" FOREIGN KEY ("criteriaId") REFERENCES "Criteria" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Annotation_definitionId_fkey" FOREIGN KEY ("definitionId") REFERENCES "Definition" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Annotation_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "Dataset" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Annotation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Annotation" ("criteriaId", "datasetId", "definitionId", "userId") SELECT "criteriaId", "datasetId", "definitionId", "userId" FROM "Annotation";
DROP TABLE "Annotation";
ALTER TABLE "new_Annotation" RENAME TO "Annotation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
