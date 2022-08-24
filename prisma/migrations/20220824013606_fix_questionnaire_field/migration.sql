/*
  Warnings:

  - You are about to drop the column `quentity` on the `questionnaires` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `questionnaires` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_questionnaires" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "andDate" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "exceedsQuantity" BOOLEAN NOT NULL,
    "canBeOnline" BOOLEAN NOT NULL,
    "isActive" BOOLEAN NOT NULL
);
INSERT INTO "new_questionnaires" ("andDate", "canBeOnline", "exceedsQuantity", "id", "image", "isActive", "link", "name") SELECT "andDate", "canBeOnline", "exceedsQuantity", "id", "image", "isActive", "link", "name" FROM "questionnaires";
DROP TABLE "questionnaires";
ALTER TABLE "new_questionnaires" RENAME TO "questionnaires";
CREATE UNIQUE INDEX "questionnaires_name_key" ON "questionnaires"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
