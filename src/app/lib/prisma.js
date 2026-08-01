import "dotenv/config";
import { PrismaClient } from "@/generated/prisma";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

if (!process.env.DATABASE_URL) {
	process.env.DATABASE_URL = "file:./dev.db";
}

const globalForPrisma = globalThis;
const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });

export const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		adapter,
		log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
	});

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}