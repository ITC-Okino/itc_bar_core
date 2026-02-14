import { prisma } from "@/core/lib/db";

export type ListCocktailsParams = {
    status?: string[];
    isNonAlcoholic?: boolean;
};

export const listCocktails = async (params: ListCocktailsParams = {}) => {
    const where: any = {};

    if (params.status && params.status.length > 0) {
        where.status = {
            in: params.status,
        };
    }

    if (params.isNonAlcoholic !== undefined) {
        where.isNonAlcoholic = params.isNonAlcoholic;
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
