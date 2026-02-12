import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { listCocktails } from "@/app/_service/list-cocktails";
import { StockToggle } from "@/app/(user)/_components/stock-toggle";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/core/components/ui/card";

interface CocktailCategoryPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CocktailCategoryPage({
    searchParams,
}: CocktailCategoryPageProps) {
    const { showAll } = await searchParams;

    const statusFilter = showAll === "true" ? undefined : ["IN_STOCK"];
    const cocktails = await listCocktails({ status: statusFilter });

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] p-8 md:p-16">
            <header className="max-w-6xl mx-auto mb-16 flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="flex items-center gap-6">
                    <Link
                        href="/menu"
                        className="p-2 rounded-full border border-white/10 hover:bg-white/5 text-white/60 hover:text-white transition-all"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extralight tracking-[0.3em] text-white uppercase">
                        Cocktail
                    </h1>
                </div>
                <StockToggle />
            </header>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                {cocktails.length > 0 ? (
                    cocktails.map((cocktail) => (
                        <Link
                            href={`/cocktails/${cocktail.id}`}
                            key={cocktail.id}
                            className="group block"
                        >
                            <Card className="bg-zinc-900/50 border-zinc-800/50 group-hover:border-amber-500/30 transition-all duration-500 backdrop-blur-sm h-full">
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-2">
                                        {/* Method badge */}
                                        <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 border border-amber-500/20 text-amber-400/70 rounded-full">
                                            {cocktail.method === "shake"
                                                ? "🥃 シェイク"
                                                : cocktail.method === "stir"
                                                    ? "🥄 ステア"
                                                    : cocktail.method === "blend"
                                                        ? "🌀 ブレンド"
                                                        : "🧊 ビルド"}
                                        </span>
                                        <span className="text-[10px] uppercase tracking-widest text-white/20">
                                            {cocktail.status === "IN_STOCK"
                                                ? "提供可能"
                                                : "提供不可"}
                                        </span>
                                    </div>
                                    <CardTitle className="text-2xl font-light tracking-wide text-white/90 group-hover:text-white transition-colors">
                                        {cocktail.name}
                                    </CardTitle>
                                    {cocktail.tasteNote && (
                                        <CardDescription className="text-amber-300/40 font-light italic">
                                            "{cocktail.tasteNote}"
                                        </CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    {/* Ingredient chips */}
                                    <div className="flex flex-wrap gap-2">
                                        {cocktail.ingredients.map((ing) => (
                                            <span
                                                key={ing.id}
                                                className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 text-white/50 rounded-full"
                                            >
                                                {ing.bottle?.name || ing.name}
                                                {ing.quantity && (
                                                    <span className="ml-1 text-white/30">
                                                        {ing.quantity}
                                                    </span>
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full py-32 text-center opacity-30">
                        <p className="text-lg tracking-widest uppercase font-extralight">
                            No cocktails found
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
