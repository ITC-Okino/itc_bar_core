"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
console.log("Checking DATABASE_URL...");
if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is missing!");
    process.exit(1);
}
else {
    console.log("DATABASE_URL exists (length: " + process.env.DATABASE_URL.length + ")");
    try {
        const url = new URL(process.env.DATABASE_URL);
        console.log("Protocol:", url.protocol);
    }
    catch (e) {
        console.error("Invalid URL:", e);
    }
}
const connectionString = process.env.DATABASE_URL;
async function main() {
    const prisma = new client_1.PrismaClient({
        log: ['query', 'info', 'warn', 'error']
    });
    try {
        console.log("Connecting Prisma...");
        await prisma.$connect();
        console.log("Connected successfully!");
        const count = await prisma.bottle.count();
        console.log("Bottle count:", count);
        await prisma.$disconnect();
    }
    catch (e) {
        console.error("Connection failed:", e);
        process.exit(1);
    }
}
main();
