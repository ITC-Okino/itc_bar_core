import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

console.log("Checking DATABASE_URL...");
if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is missing!");
    process.exit(1);
} else {
    console.log("DATABASE_URL exists (length: " + process.env.DATABASE_URL.length + ")");
    try {
        const url = new URL(process.env.DATABASE_URL);
        console.log("Protocol:", url.protocol);
    } catch (e) {
        console.error("Invalid URL:", e);
    }
}

const connectionString = process.env.DATABASE_URL!;
const sql = neon(connectionString);

async function main() {
    try {
        console.log("Testing neon() HTTP connection directly...");
        const res = await sql`SELECT 1 as result`;
        console.log("Neon HTTP connection successful:", res[0]);
    } catch (e) {
        console.error("Neon HTTP connection failed:", e);
        process.exit(1);
    }

    const adapter = new PrismaNeonHttp(connectionString, { arrayMode: false, fullResults: true });
    const prisma = new PrismaClient({ adapter });

    try {
        console.log("Connecting Prisma...");
        await prisma.$connect();
        console.log("Connected successfully!");
        const count = await prisma.bottle.count();
        console.log("Bottle count:", count);
        await prisma.$disconnect();
    } catch (e) {
        console.error("Connection failed:", e);
        process.exit(1);
    }
}

main();
