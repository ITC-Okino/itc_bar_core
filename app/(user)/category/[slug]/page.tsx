import type { Bottle, Cocktail } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { listBottles } from "@/app/_service/list-bottles";
import { listCocktails } from "@/app/_service/list-cocktails";
import { StockToggle } from "@/app/(user)/_components/stock-toggle";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/core/components/ui/card";

interface CategoryPageProps {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

import { CATEGORY_MAP } from "@/core/lib/categories";

export default async function CategoryPage({
	params,
	searchParams,
}: CategoryPageProps) {
	const { slug } = await params;
	const { showAll } = await searchParams;

	const config = CATEGORY_MAP[slug] || {
		title: slug.toUpperCase(),
		search: slug,
	};

	const statusFilter = showAll === "true" ? undefined : ["IN_STOCK"];
	const isCocktailCategory = slug === "cocktail";
	const isMocktailCategory = slug === "mocktail";
	const isDrinkCategory = isCocktailCategory || isMocktailCategory;

	let bottles: Bottle[] = [];
	let cocktails: Cocktail[] = [];

	if (isDrinkCategory) {
		cocktails = await listCocktails({
			status: statusFilter,
			isNonAlcoholic: isMocktailCategory,
		});
	} else {
		bottles = await listBottles({
			category: config.search,
			status: statusFilter,
		});
	}

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
						{config.title}
					</h1>
				</div>
				<div className="flex items-center gap-4">
					{isCocktailCategory && (
						<Link href="/category/mocktail">
							<Button
								variant="outline"
								className="border-white/10 text-white/60 hover:text-white hover:bg-white/5 tracking-wider font-light"
							>
								ノンアルコールはこちら
							</Button>
						</Link>
					)}
					<StockToggle />
				</div>
			</header>

			<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
				{isDrinkCategory ? (
					cocktails.length > 0 ? (
						cocktails.map((cocktail) => (
							<Link href={`/cocktails/${cocktail.id}`} key={cocktail.id} className="group block">
								<Card className="bg-zinc-900/50 border-zinc-800/50 group-hover:border-white/20 transition-all duration-500 backdrop-blur-sm h-full">
									<CardHeader>
										<div className="flex justify-between items-start mb-2">
											<Badge
												variant="outline"
												className="text-white/40 border-white/10 group-hover:text-white/60 group-hover:border-white/20 transition-colors"
											>
												{cocktail.isNonAlcoholic ? "NON-ALCOHOLIC" : "COCKTAIL"}
											</Badge>
											<span
												className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded border ${cocktail.status === "IN_STOCK"
													? "text-emerald-400 border-emerald-400/20 bg-emerald-400/5"
													: "text-red-400 border-red-400/20 bg-red-400/5"
													}`}
											>
												{cocktail.status === "IN_STOCK" ? "在庫あり" : "在庫なし"}
											</span>
										</div>
										<CardTitle className="text-xl font-light tracking-wide text-white/90 group-hover:text-white transition-colors">
											{cocktail.name}
										</CardTitle>
										<CardDescription className="text-white/40 font-extralight capitalize">
											{cocktail.method}
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										{cocktail.tasteNote && (
											<p className="text-sm text-white/40 leading-relaxed italic font-light line-clamp-2">
												"{cocktail.tasteNote}"
											</p>
										)}
										{cocktail.description && (
											<p className="text-sm text-white/60 leading-relaxed font-light line-clamp-2">
												{cocktail.description}
											</p>
										)}
									</CardContent>
								</Card>
							</Link>
						))
					) : (
						<div className="col-span-full py-32 text-center opacity-30">
							<p className="text-lg tracking-widest uppercase font-extralight">
								カクテルが見つかりませんでした
							</p>
						</div>
					)
				) : (
					bottles.length > 0 ? (
						bottles.map((bottle) => (
							<Link href={`/bottles/${bottle.id}`} key={bottle.id} className="group block">
								<Card className="bg-zinc-900/50 border-zinc-800/50 group-hover:border-white/20 transition-all duration-500 backdrop-blur-sm h-full">
									<CardHeader>
										<div className="flex justify-between items-start mb-2">
											<Badge
												variant="outline"
												className="text-white/40 border-white/10 group-hover:text-white/60 group-hover:border-white/20 transition-colors"
											>
												{bottle.category}
											</Badge>
											<span
												className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded border ${bottle.status === "IN_STOCK"
													? "text-emerald-400 border-emerald-400/20 bg-emerald-400/5"
													: "text-red-400 border-red-400/20 bg-red-400/5"
													}`}
											>
												{bottle.status === "IN_STOCK" ? "在庫あり" : "在庫なし"}
											</span>
										</div>
										<CardTitle className="text-xl font-light tracking-wide text-white/90 group-hover:text-white transition-colors">
											{bottle.name}
										</CardTitle>
										<CardDescription className="text-white/40 font-extralight">
											{bottle.brand} {bottle.proof && `• ${bottle.proof}%`}
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										{bottle.tasteNote && (
											<p className="text-sm text-white/40 leading-relaxed italic font-light line-clamp-2">
												"{bottle.tasteNote}"
											</p>
										)}
										{bottle.description && (
											<p className="text-sm text-white/60 leading-relaxed font-light line-clamp-2">
												{bottle.description}
											</p>
										)}
									</CardContent>
								</Card>
							</Link>
						))
					) : (
						<div className="col-span-full py-32 text-center opacity-30">
							<p className="text-lg tracking-widest uppercase font-extralight">
								商品が見つかりませんでした
							</p>
						</div>
					)
				)}
			</div>
		</main>
	);
}
