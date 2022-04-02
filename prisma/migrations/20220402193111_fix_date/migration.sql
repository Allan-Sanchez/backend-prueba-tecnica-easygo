/*
  Warnings:

  - Added the required column `competitionDate` to the `Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Calendar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "carnet" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "career" TEXT NOT NULL,
    "poetry" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "competitionDate" DATETIME NOT NULL
);
INSERT INTO "new_Calendar" ("address", "career", "carnet", "createdAt", "gender", "id", "name", "phone", "poetry", "uuid") SELECT "address", "career", "carnet", "createdAt", "gender", "id", "name", "phone", "poetry", "uuid" FROM "Calendar";
DROP TABLE "Calendar";
ALTER TABLE "new_Calendar" RENAME TO "Calendar";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
