/*
  Warnings:

  - Added the required column `isActive` to the `appliers` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_appliers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL
);
INSERT INTO "new_appliers" ("id", "name") SELECT "id", "name" FROM "appliers";
DROP TABLE "appliers";
ALTER TABLE "new_appliers" RENAME TO "appliers";
CREATE UNIQUE INDEX "appliers_name_key" ON "appliers"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
