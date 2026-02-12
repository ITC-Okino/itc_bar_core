import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeonHttp(connectionString);
const prisma = new PrismaClient({ adapter });

async function main() {
    const count = await prisma.cocktail.count();
    console.log(`Cocktail count: ${count}`);

    if (count > 0) {
        const list = await prisma.cocktail.findMany({
            include: { ingredients: true }
        });
        console.log(`Found ${list.length} cocktails.`);
        list.forEach(c => console.log(`- ${c.name} (Ingredients: ${c.ingredients.length})`));
    } else {
        console.log("No cocktails found.");
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
