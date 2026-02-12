import { prisma } from "@/core/lib/db";
import CocktailForm from "@/app/admin/_components/cocktail-form";

export default async function NewCocktailPage() {
    const bottles = await prisma.bottle.findMany({
        orderBy: { name: "asc" },
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                    新規カクテル作成
                </h1>
                <CocktailForm bottles={bottles} />
            </div>
        </div>
    );
}
