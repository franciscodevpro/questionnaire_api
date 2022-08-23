/*
  Warnings:

  - You are about to drop the column `token_expiration` on the `users` table. All the data in the column will be lost.
  - Added the required column `tokenExpiration` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "tokenExpiration" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL
);
INSERT INTO "new_users" ("id", "isActive", "login", "name", "password", "token") SELECT "id", "isActive", "login", "name", "password", "token" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
