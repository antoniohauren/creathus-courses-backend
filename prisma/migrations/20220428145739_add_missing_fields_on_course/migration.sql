/*
  Warnings:

  - Added the required column `location` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `open_date` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_courses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "open_date" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "trail_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "courses_trail_id_fkey" FOREIGN KEY ("trail_id") REFERENCES "trails" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_courses" ("created_at", "end_date", "id", "start_date", "title", "trail_id", "updated_at") SELECT "created_at", "end_date", "id", "start_date", "title", "trail_id", "updated_at" FROM "courses";
DROP TABLE "courses";
ALTER TABLE "new_courses" RENAME TO "courses";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
