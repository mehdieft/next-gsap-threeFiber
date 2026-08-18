PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "discount" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "new_Products" ("id", "name", "price", "discount", "createdAt", "updatedAt")
SELECT "id", "name", "price", "discount", "createdAt", "updatedAt"
FROM "Products";

DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;