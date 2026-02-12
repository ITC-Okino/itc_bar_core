import { prisma } from "./core/lib/db";

async function main() {
    console.log("Checking Bottle schema...");
    const bottle = await prisma.bottle.findFirst();
    if (bottle) {
        console.log("Bottle found:", bottle.name);
        console.log("imageUrl:", bottle.imageUrl);
        console.log("status:", bottle.status);
    } else {
        console.log("No bottles found.");
    }

    console.log("\nChecking Cocktail schema...");
    const cocktail = await prisma.cocktail.findFirst();
    if (cocktail) {
        console.log("Cocktail found:", cocktail.name);
        console.log("imageUrl:", cocktail.imageUrl);
        console.log("status:", cocktail.status);
    } else {
        console.log("No cocktails found.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
