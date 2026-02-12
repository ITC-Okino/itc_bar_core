import { NextResponse } from "next/server";
import { prisma } from "@/core/lib/db";

export async function GET() {
    try {
        const cocktails = await prisma.cocktail.findMany({
            include: {
                ingredients: {
                    include: { bottle: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(cocktails);
    } catch (error) {
        console.error("Failed to fetch cocktails:", error);
        return NextResponse.json(
            { error: "Failed to fetch cocktails" },
            { status: 500 },
        );
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const { ingredients, ...cocktailData } = json;

        const cocktail = await prisma.cocktail.create({
            data: {
                ...cocktailData,
                ingredients: {
                    create: ingredients.map(
                        (ing: { bottleId?: number; name?: string; quantity?: string }) => ({
                            bottleId: ing.bottleId || null,
                            name: ing.name || null,
                            quantity: ing.quantity || null,
                        }),
                    ),
                },
            },
            include: {
                ingredients: {
                    include: { bottle: true },
                },
            },
        });
        return NextResponse.json(cocktail);
    } catch (error) {
        console.error("Failed to create cocktail:", error);
        return NextResponse.json(
            { error: "Failed to create cocktail" },
            { status: 500 },
        );
    }
}
