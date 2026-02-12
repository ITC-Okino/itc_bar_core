import { notFound } from "next/navigation";
import { prisma } from "@/core/lib/db";
import CocktailForm from "@/app/admin/_components/cocktail-form";

interface EditCocktailPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditCocktailPage({
    params,
}: EditCocktailPageProps) {
    const { id } = await params;
    const cocktailId = Number(id);

    if (Number.isNaN(cocktailId)) {
        notFound();
    }

    const cocktail = await prisma.cocktail.findUnique({
        where: { id: cocktailId },
        include: {
            ingredients: {
                include: { bottle: true },
            },
        },
    });

    if (!cocktail) {
        notFound();
    }

    const bottles = await prisma.bottle.findMany({
        orderBy: { name: "asc" },
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                    カクテル編集: {cocktail.name}
                </h1>
                <CocktailForm initialData={cocktail} bottles={bottles} />
            </div>
        </div>
    );
}
