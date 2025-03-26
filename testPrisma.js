// test-db.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ['query'] });

async function test() {
  try {
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log("PostgreSQL version:", result);
  } catch (error) {
    console.error("Connection error:", error);
  }
}
test();