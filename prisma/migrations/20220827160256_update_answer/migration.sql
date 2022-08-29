/*
  Warnings:

  - Added the required column `isActive` to the `answers` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_answers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idQuestionnaireData" TEXT NOT NULL,
    "idQuestion" TEXT NOT NULL,
    "idAnswerOption" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdA" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    CONSTRAINT "answers_idQuestionnaireData_fkey" FOREIGN KEY ("idQuestionnaireData") REFERENCES "questionnaire_datas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "answers_idQuestion_fkey" FOREIGN KEY ("idQuestion") REFERENCES "questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "answers_idAnswerOption_fkey" FOREIGN KEY ("idAnswerOption") REFERENCES "answer_options" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_answers" ("createdA", "duration", "id", "idAnswerOption", "idQuestion", "idQuestionnaireData", "value") SELECT "createdA", "duration", "id", "idAnswerOption", "idQuestion", "idQuestionnaireData", "value" FROM "answers";
DROP TABLE "answers";
ALTER TABLE "new_answers" RENAME TO "answers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
