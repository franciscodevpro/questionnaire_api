-- CreateTable
CREATE TABLE "questionnaires" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "quentity" INTEGER NOT NULL,
    "andDate" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "exceedsQuantity" BOOLEAN NOT NULL,
    "canBeOnline" BOOLEAN NOT NULL,
    "isActive" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "_DeviceToQuestionnaire" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_DeviceToQuestionnaire_A_fkey" FOREIGN KEY ("A") REFERENCES "devices" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DeviceToQuestionnaire_B_fkey" FOREIGN KEY ("B") REFERENCES "questionnaires" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ApplierToQuestionnaire" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ApplierToQuestionnaire_A_fkey" FOREIGN KEY ("A") REFERENCES "appliers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ApplierToQuestionnaire_B_fkey" FOREIGN KEY ("B") REFERENCES "questionnaires" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "questionnaires_name_key" ON "questionnaires"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_DeviceToQuestionnaire_AB_unique" ON "_DeviceToQuestionnaire"("A", "B");

-- CreateIndex
CREATE INDEX "_DeviceToQuestionnaire_B_index" ON "_DeviceToQuestionnaire"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ApplierToQuestionnaire_AB_unique" ON "_ApplierToQuestionnaire"("A", "B");

-- CreateIndex
CREATE INDEX "_ApplierToQuestionnaire_B_index" ON "_ApplierToQuestionnaire"("B");
