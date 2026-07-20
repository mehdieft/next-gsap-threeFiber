-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AdminUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userType" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_AdminUser" ("id", "password", "userName", "userType") SELECT "id", "password", "userName", "userType" FROM "AdminUser";
DROP TABLE "AdminUser";
ALTER TABLE "new_AdminUser" RENAME TO "AdminUser";
CREATE UNIQUE INDEX "AdminUser_userName_key" ON "AdminUser"("userName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
