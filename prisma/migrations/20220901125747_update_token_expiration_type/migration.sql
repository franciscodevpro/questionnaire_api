/*
  Warnings:

  - You are about to alter the column `tokenExpiration` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "tokenExpiration" BIGINT NOT NULL,
    "isActive" BOOLEAN NOT NULL
);
INSERT INTO "new_users" ("id", "isActive", "login", "name", "password", "token", "tokenExpiration") SELECT "id", "isActive", "login", "name", "password", "token", "tokenExpiration" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
