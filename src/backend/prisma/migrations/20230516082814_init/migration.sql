-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Access" (
    "userId" INTEGER NOT NULL,
    "datasetId" INTEGER NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',

    PRIMARY KEY ("userId", "datasetId"),
    CONSTRAINT "Access_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Access_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "Dataset" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Access" ("datasetId", "role", "userId") SELECT "datasetId", "role", "userId" FROM "Access";
DROP TABLE "Access";
ALTER TABLE "new_Access" RENAME TO "Access";
CREATE TABLE "new_Annotation" (
    "criteriaId" INTEGER NOT NULL,
    "definitionId" INTEGER NOT NULL,
    "datasetId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("criteriaId", "definitionId", "datasetId"),
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
