-- CreateTable
CREATE TABLE "Answer_options" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idQuestion" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    CONSTRAINT "Answer_options_idQuestion_fkey" FOREIGN KEY ("idQuestion") REFERENCES "questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
