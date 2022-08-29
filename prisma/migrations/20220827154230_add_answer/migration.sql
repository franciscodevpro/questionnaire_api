-- CreateTable
CREATE TABLE "answers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idQuestionnaireData" TEXT NOT NULL,
    "idQuestion" TEXT NOT NULL,
    "idAnswerOption" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdA" TEXT NOT NULL,
    CONSTRAINT "answers_idQuestionnaireData_fkey" FOREIGN KEY ("idQuestionnaireData") REFERENCES "questionnaire_datas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "answers_idQuestion_fkey" FOREIGN KEY ("idQuestion") REFERENCES "questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "answers_idAnswerOption_fkey" FOREIGN KEY ("idAnswerOption") REFERENCES "answer_options" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
