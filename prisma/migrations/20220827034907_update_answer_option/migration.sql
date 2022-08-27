/*
  Warnings:

  - You are about to drop the `Answer_options` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Answer_options";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "answer_options" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idQuestion" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    CONSTRAINT "answer_options_idQuestion_fkey" FOREIGN KEY ("idQuestion") REFERENCES "questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
