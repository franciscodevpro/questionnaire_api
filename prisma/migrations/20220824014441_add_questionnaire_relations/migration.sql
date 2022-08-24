-- CreateTable
CREATE TABLE "QuestionnaireOnDevices" (
    "deviceId" TEXT NOT NULL,
    "questionnaireId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    PRIMARY KEY ("deviceId", "questionnaireId"),
    CONSTRAINT "QuestionnaireOnDevices_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuestionnaireOnDevices_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "questionnaires" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuestionnaireOnApplier" (
    "applierId" TEXT NOT NULL,
    "questionnaireId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    PRIMARY KEY ("applierId", "questionnaireId"),
    CONSTRAINT "QuestionnaireOnApplier_applierId_fkey" FOREIGN KEY ("applierId") REFERENCES "appliers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuestionnaireOnApplier_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "questionnaires" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
