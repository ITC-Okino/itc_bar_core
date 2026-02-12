import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";
import Database from "better-sqlite3";

const dbPath = process.env.DATABASE_URL || "file:dev.db";
const connection = new Database("dev.db");
const adapter = new PrismaBetterSqlite3(connection);
const prisma = new PrismaClient({ adapter });

async function main() {
    const bottle = await prisma.bottle.findFirst({
        where: { name: "バスカー・アイリッシュウイスキー（緑）" },
    });
    console.log("Bottle Name:", bottle?.name);
    console.log("Description:", bottle?.description);

    const count = await prisma.bottle.count();
    console.log("Total Bottles:", count);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
