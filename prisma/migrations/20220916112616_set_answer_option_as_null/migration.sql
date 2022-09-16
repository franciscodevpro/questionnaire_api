-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_answers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idQuestionnaireData" TEXT NOT NULL,
    "idQuestion" TEXT NOT NULL,
    "idAnswerOption" TEXT,
    "value" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    CONSTRAINT "answers_idQuestionnaireData_fkey" FOREIGN KEY ("idQuestionnaireData") REFERENCES "questionnaire_datas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "answers_idQuestion_fkey" FOREIGN KEY ("idQuestion") REFERENCES "questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "answers_idAnswerOption_fkey" FOREIGN KEY ("idAnswerOption") REFERENCES "answer_options" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_answers" ("createdAt", "duration", "id", "idAnswerOption", "idQuestion", "idQuestionnaireData", "isActive", "value") SELECT "createdAt", "duration", "id", "idAnswerOption", "idQuestion", "idQuestionnaireData", "isActive", "value" FROM "answers";
DROP TABLE "answers";
ALTER TABLE "new_answers" RENAME TO "answers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
