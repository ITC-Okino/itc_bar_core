import { prisma } from "@/core/lib/db";

export type ListCocktailsParams = {
    status?: string[];
};

export const listCocktails = async (params: ListCocktailsParams = {}) => {
    const where: Record<string, unknown> = {};

    if (params.status && params.status.length > 0) {
        where.status = {
            in: params.status,
        };
    }

    return await prisma.cocktail.findMany({
        where,
        include: {
            ingredients: {
                include: {
                    bottle: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
};
