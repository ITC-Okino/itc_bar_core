"use server";

import { prisma } from "@/core/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteCocktail(id: number) {
    await prisma.cocktail.delete({ where: { id } });
    revalidatePath("/admin/cocktails");
}
