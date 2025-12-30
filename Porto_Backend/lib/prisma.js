import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });

export async function connectDB() {
    try {
        await prisma.$connect();
        console.log("Prisma Connected Successfully");
        
    } catch (error) {
        console.error("Prisma Connection Error :", Error);
        process.exit(1);
    }
}