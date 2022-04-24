-- CreateTable
CREATE TABLE "trails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_lessons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "duration" INTEGER NOT NULL,
    "instructor_id" TEXT NOT NULL,
    "trail_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "lessons_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "instructors" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "lessons_trail_id_fkey" FOREIGN KEY ("trail_id") REFERENCES "trails" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_lessons" ("created_at", "duration", "id", "instructor_id", "updated_at") SELECT "created_at", "duration", "id", "instructor_id", "updated_at" FROM "lessons";
DROP TABLE "lessons";
ALTER TABLE "new_lessons" RENAME TO "lessons";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
