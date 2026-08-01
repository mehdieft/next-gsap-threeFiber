require("dotenv").config({ path: ".env.local" });

const { PrismaClient } = require("../src/generated/prisma");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const bcrypt = require("bcrypt");

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const userTypes = ["admin", "user", "superAdmin"];
  const adminUsers = [];

  // Generate 50 fake admin users
  for (let i = 0; i < 50; i++) {
    const username = `admin_user_${i + 1}`;
    const password = await bcrypt.hash(`password_${i + 1}`, 10);

    adminUsers.push({
      userType: userTypes[Math.floor(Math.random() * userTypes.length)],
      userName: username,
      password: password,
    });
  }

  // Insert all at once
  const result = await prisma.adminUser.createMany({
    data: adminUsers,
  });

  console.log(`✅ Seeded ${result.count} admin users`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
