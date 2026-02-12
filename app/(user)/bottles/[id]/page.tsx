import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/core/lib/db";
import { Badge } from "@/core/components/ui/badge";
import Image from "next/image";
import { getSlugFromCategory } from "@/core/lib/categories";

interface BottlePageProps {
    params: Promise<{ id: string }>;
}

export default async function BottlePage({ params }: BottlePageProps) {
    const { id } = await params;
    const bottleId = Number(id);

    if (Number.isNaN(bottleId)) {
        notFound();
    }

    const bottle = await prisma.bottle.findUnique({
        where: { id: bottleId },
    });

    if (!bottle) {
        notFound();
    }

    const backSlug = getSlugFromCategory(bottle.category);

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] p-6 md:p-12 lg:p-24 flex items-start justify-center">
            <div className="max-w-6xl w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                <Link
                    href={`/category/${backSlug}`}
                    className="inline-flex items-center gap-2 mb-12 text-white/40 hover:text-white transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm tracking-widest uppercase">一覧に戻る</span>
                </Link>

                <article className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                    {/* Left: Image (smaller and constrained) */}
                    <div className="lg:col-span-4 flex justify-center lg:justify-start">
                        {bottle.imageUrl ? (
                            <div className="relative w-full max-w-[280px] lg:max-w-full aspect-[3/4] rounded-lg overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl transition-transform hover:scale-[1.02] duration-500">
                                <Image
                                    src={bottle.imageUrl}
                                    alt={bottle.name}
                                    fill
                                    className="object-contain p-6"
                                    priority
                                />
                            </div>
                        ) : (
                            <div className="w-full max-w-[280px] aspect-[3/4] rounded-lg border border-dashed border-white/10 bg-white/[0.01] flex items-center justify-center">
                                <span className="text-white/10 text-xs tracking-widest uppercase">画像なし</span>
                            </div>
                        )}
                    </div>

                    {/* Right: Content */}
                    <div className="lg:col-span-8 space-y-12">
                        <header className="space-y-6">
                            <div className="space-y-4">
                                <Badge
                                    variant="outline"
                                    className="text-white/40 border-white/10 px-3 py-1 text-[10px] tracking-[0.2em] uppercase"
                                >
                                    {bottle.category}
                                </Badge>
                                <h1 className="text-3xl md:text-5xl font-extralight tracking-widest text-white leading-tight">
                                    {bottle.name}
                                </h1>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                                    <p className="text-white/50 font-light text-lg tracking-wide uppercase">
                                        {bottle.brand}
                                    </p>
                                    {bottle.proof && (
                                        <span className="text-white/20 font-extralight text-lg">
                                            {bottle.proof}% Vol.
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                                    在庫状況
                                </span>
                                <span
                                    className={`text-xs tracking-[0.2em] px-4 py-1.5 border rounded-full ${bottle.status === "IN_STOCK"
                                        ? "text-emerald-400 border-emerald-400/20 bg-emerald-400/5"
                                        : "text-red-400 border-red-400/20 bg-red-400/5"
                                        }`}
                                >
                                    {bottle.status === "IN_STOCK"
                                        ? "在庫あり"
                                        : "在庫なし"}
                                </span>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-white/5">
                            {bottle.tasteNote && (
                                <section className={`space-y-4 ${!bottle.description ? "md:col-span-2" : ""}`}>
                                    <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                                        テイスティングノート
                                    </h2>
                                    <p className="text-xl font-light italic text-white/90 leading-relaxed">
                                        "{bottle.tasteNote}"
                                    </p>
                                </section>
                            )}

                            {bottle.description && (
                                <section className={`space-y-4 ${!bottle.tasteNote ? "md:col-span-2" : ""}`}>
                                    <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                                        説明
                                    </h2>
                                    <p className="text-white/50 font-light leading-loose text-sm text-justify">
                                        {bottle.description}
                                    </p>
                                </section>
                            )}
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}
