-- CreateTable
CREATE TABLE "questions" (
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
    CONSTRAINT "questions_idQuestionnaire_fkey" FOREIGN KEY ("idQuestionnaire") REFERENCES "questionnaires" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
