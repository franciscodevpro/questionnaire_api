-- CreateTable
CREATE TABLE "appliers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "appliers_name_key" ON "appliers"("name");
