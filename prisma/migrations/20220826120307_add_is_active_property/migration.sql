/*
  Warnings:

  - Added the required column `isActive` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idQuestionnaire" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "variable" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "minAnswers" INTEGER NOT NULL,
    "maxAnswers" INTEGER NOT NULL,
    "defaultValue" TEXT NOT NULL,
    "shuffle" BOOLEAN NOT NULL,
    "prioritizeBySelection" BOOLEAN NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    CONSTRAINT "questions_idQuestionnaire_fkey" FOREIGN KEY ("idQuestionnaire") REFERENCES "questionnaires" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_questions" ("defaultValue", "id", "idQuestionnaire", "maxAnswers", "minAnswers", "prioritizeBySelection", "shuffle", "title", "type", "variable") SELECT "defaultValue", "id", "idQuestionnaire", "maxAnswers", "minAnswers", "prioritizeBySelection", "shuffle", "title", "type", "variable" FROM "questions";
DROP TABLE "questions";
ALTER TABLE "new_questions" RENAME TO "questions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
