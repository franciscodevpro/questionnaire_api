-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_questionnaire_datas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idQuestionnaire" TEXT NOT NULL,
    "idApplier" TEXT NOT NULL,
    "idDevice" TEXT NOT NULL,
    "audioPath" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "lon" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "questionnaire_datas_idQuestionnaire_fkey" FOREIGN KEY ("idQuestionnaire") REFERENCES "questionnaires" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "questionnaire_datas_idApplier_fkey" FOREIGN KEY ("idApplier") REFERENCES "appliers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "questionnaire_datas_idDevice_fkey" FOREIGN KEY ("idDevice") REFERENCES "devices" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_questionnaire_datas" ("audioPath", "duration", "id", "idApplier", "idDevice", "idQuestionnaire", "isActive", "lat", "lon") SELECT "audioPath", "duration", "id", "idApplier", "idDevice", "idQuestionnaire", "isActive", "lat", "lon" FROM "questionnaire_datas";
DROP TABLE "questionnaire_datas";
ALTER TABLE "new_questionnaire_datas" RENAME TO "questionnaire_datas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
