import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/core/lib/db";
import { Badge } from "@/core/components/ui/badge";
import Image from "next/image";

interface CocktailPageProps {
    params: Promise<{ id: string }>;
}

export default async function CocktailDetailPage({
    params,
}: CocktailPageProps) {
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

    const methodInfo = {
        shake: {
            label: "シェイク",
            icon: "🥃",
            description: "シェイカーで力強くシェイクして仕上げます",
        },
        stir: {
            label: "ステア",
            icon: "🥄",
            description: "ミキシンググラスで静かに混ぜ合わせます",
        },
        build: {
            label: "ビルド",
            icon: "🧊",
            description: "グラスに直接材料を注いで作ります",
        },
        blend: {
            label: "ブレンド",
            icon: "🌀",
            description: "ブレンダーで滑らかに仕上げます",
        },
    };

    const method =
        methodInfo[(cocktail.method as keyof typeof methodInfo) || "build"];

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] p-6 md:p-12 lg:p-24">
            <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Back link */}
                <Link
                    href="/category/cocktail"
                    className="inline-flex items-center gap-2 mb-12 text-white/40 hover:text-white transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm tracking-widest uppercase">
                        カクテル一覧に戻る
                    </span>
                </Link>

                {/* Header Section */}
                <div className="mb-20">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start lg:items-center">
                        <div className="flex-1 space-y-8">
                            <div className="flex flex-wrap items-center gap-4">
                                <Badge
                                    variant="outline"
                                    className="text-amber-400/60 border-amber-500/20 px-4 py-1 text-[10px] tracking-[0.2em]"
                                >
                                    カクテル
                                </Badge>
                                <span className="text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 border border-white/10 text-white/30 rounded-full bg-white/[0.02]">
                                    {method.icon} {method.label}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extralight tracking-[0.1em] text-white leading-tight">
                                {cocktail.name}
                            </h1>
                            {cocktail.tasteNote && (
                                <p className="text-xl md:text-2xl font-light italic text-amber-300/40 border-l border-amber-500/20 pl-6 py-2">
                                    "{cocktail.tasteNote}"
                                </p>
                            )}
                        </div>

                        {cocktail.imageUrl && (
                            <div className="w-full lg:w-1/3 max-w-[320px] aspect-[3/4] relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl transition-transform hover:scale-[1.02] duration-500 flex-shrink-0">
                                <Image
                                    src={cocktail.imageUrl}
                                    alt={cocktail.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Left: Ingredients & Method */}
                    <div className="lg:col-span-7 space-y-16">
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 border border-white/5 bg-white/[0.01] rounded-xl space-y-4">
                                <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                                    作り方
                                </h2>
                                <div>
                                    <p className="text-2xl font-light text-white/80 flex items-center gap-3">
                                        <span className="opacity-50">{method.icon}</span> {method.label}
                                    </p>
                                    <p className="text-sm text-white/30 mt-3 font-light leading-relaxed">
                                        {method.description}
                                    </p>
                                </div>
                            </div>

                            <div className="p-8 border border-white/5 bg-white/[0.01] rounded-xl space-y-4 flex flex-col justify-center">
                                <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                                    在庫状況
                                </h2>
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${cocktail.status === "IN_STOCK" ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" : "bg-red-500"}`} />
                                    <span className={`text-sm tracking-[0.2em] uppercase ${cocktail.status === "IN_STOCK" ? "text-emerald-400" : "text-red-400"}`}>
                                        {cocktail.status === "IN_STOCK" ? "在庫あり" : "在庫なし"}
                                    </span>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-10 pb-4 border-b border-white/5">
                                構成
                            </h2>
                            <div className="space-y-1">
                                {cocktail.ingredients.map((ing) => (
                                    <div
                                        key={ing.id}
                                        className="flex items-center justify-between py-6 border-b border-white/5 group hover:bg-white/[0.01] px-4 -mx-4 transition-colors rounded-lg"
                                    >
                                        <div className="flex items-center gap-6">
                                            {ing.bottle ? (
                                                <Link
                                                    href={`/bottles/${ing.bottle.id}`}
                                                    className="text-white/80 hover:text-amber-300 transition-colors font-light text-xl tracking-wide flex items-center gap-3"
                                                >
                                                    {ing.bottle.name}
                                                    <Badge variant="outline" className="text-[8px] border-white/5 text-white/20 h-5">
                                                        {ing.bottle.category}
                                                    </Badge>
                                                </Link>
                                            ) : (
                                                <span className="text-white/60 font-light text-xl tracking-wide">
                                                    {ing.name}
                                                </span>
                                            )}
                                        </div>
                                        {ing.quantity && (
                                            <span className="text-sm text-white/30 tracking-widest font-light tabular-nums">
                                                {ing.quantity}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right: Description & Additional Details */}
                    <div className="lg:col-span-5 space-y-16 lg:sticky lg:top-12">
                        {cocktail.description && (
                            <section className="space-y-6">
                                <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                                    説明
                                </h2>
                                <div className="relative">
                                    <p className="text-white/60 font-light leading-loose text-lg text-justify indent-8">
                                        {cocktail.description}
                                    </p>
                                    <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/10 via-transparent to-transparent" />
                                </div>
                            </section>
                        )}

                        <section className="pt-12 border-t border-white/5 flex items-center justify-between">
                            <div className="text-[10px] uppercase tracking-[0.3em] text-white/10">
                                クラフトマンシップ
                            </div>
                            <div className="flex gap-2">
                                <div className="w-1 h-1 rounded-full bg-amber-500/20" />
                                <div className="w-1 h-1 rounded-full bg-amber-500/40" />
                                <div className="w-1 h-1 rounded-full bg-amber-500/20" />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
