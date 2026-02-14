import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/core/lib/db";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const cocktail = await prisma.cocktail.findUnique({
            where: { id: Number(id) },
            include: {
                ingredients: {
                    include: { bottle: true },
                },
            },
        });
        if (!cocktail) {
            return NextResponse.json(
                { error: "Cocktail not found" },
                { status: 404 },
            );
        }
        return NextResponse.json(cocktail);
    } catch (error) {
        console.error("Failed to fetch cocktail:", error);
        return NextResponse.json(
            { error: "Failed to fetch cocktail" },
            { status: 500 },
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const json = await request.json();
        const { ingredients, ...cocktailData } = json;

        // Delete existing ingredients and recreate
        await prisma.cocktailIngredient.deleteMany({
            where: { cocktailId: Number(id) },
        });

        const cocktail = await prisma.cocktail.update({
            where: { id: Number(id) },
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
        revalidatePath("/");
        revalidatePath("/admin/cocktails");
        revalidatePath("/category/cocktail");
        revalidatePath("/category/mocktail");

        return NextResponse.json(cocktail);
    } catch (error) {
        console.error("Failed to update cocktail:", error);
        return NextResponse.json(
            { error: "Failed to update cocktail" },
            { status: 500 },
        );
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        await prisma.cocktail.delete({
            where: { id: Number(id) },
        });

        revalidatePath("/");
        revalidatePath("/admin/cocktails");
        revalidatePath("/category/cocktail");
        revalidatePath("/category/mocktail");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete cocktail:", error);
        return NextResponse.json(
            { error: "Failed to delete cocktail" },
            { status: 500 },
        );
    }
}
