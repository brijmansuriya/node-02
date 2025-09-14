import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function initPrisma() {
  try {
    await prisma.$connect();
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
}

export default prisma;