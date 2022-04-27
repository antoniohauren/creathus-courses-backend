/*
  Warnings:

  - Added the required column `name` to the `trails` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_trails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_trails" ("created_at", "id", "updated_at") SELECT "created_at", "id", "updated_at" FROM "trails";
DROP TABLE "trails";
ALTER TABLE "new_trails" RENAME TO "trails";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
