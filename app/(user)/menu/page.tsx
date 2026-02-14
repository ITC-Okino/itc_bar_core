import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/core/components/ui/card";

const categories = [
	{ slug: "whisky", title: "WHISKY", subtitle: "ウイスキー", img: "/img/whisky.png" },
	{ slug: "gin", title: "GIN", subtitle: "ジン", img: "/img/gin.png" },
	{ slug: "vodka", title: "VODKA", subtitle: "ウォッカ", img: "/img/vodka.png" },
	{ slug: "rum", title: "RUM", subtitle: "ラム", img: "/img/rum.png" },
	{ slug: "tequila", title: "TEQUILA", subtitle: "テキーラ", img: "/img/tequila.png" },
	{ slug: "liqueur", title: "LIQUEUR", subtitle: "リキュール", img: "/img/liqueur.png" },
	{ slug: "cocktail", title: "COCKTAIL", subtitle: "カクテル", img: "/img/cocktail.png" },
	{ slug: "mocktail", title: "MOCKTAIL", subtitle: "ノンアルコール", img: "/img/mocktail.png" }, // TODO: Add mocktail image
	{ slug: "other", title: "OTHER", subtitle: "その他", img: "/img/liqueur.png" },
];

export default async function MenuPage() {
	return (
		<div className="min-h-screen bg-[#0a0a0a] text-zinc-50 p-8 md:p-16">
			<header className="max-w-6xl mx-auto mb-16 flex items-center gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
				<Link
					href="/"
					className="p-2 rounded-full border border-white/10 hover:bg-white/5 text-white/60 hover:text-white transition-all"
				>
					<ChevronLeft className="w-6 h-6" />
				</Link>
				<h1 className="text-4xl md:text-5xl font-extralight tracking-[0.3em] text-white uppercase">
					メニュー
				</h1>
			</header>

			<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
				{categories.map((category) => (
					<Link
						href={`/category/${category.slug}`}
						key={category.slug}
						className="group block"
					>
						<Card className="bg-zinc-900/50 border-zinc-800/50 group-hover:border-white/20 transition-all duration-500 backdrop-blur-sm h-full overflow-hidden">
							<div
								className="h-48 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"
								style={{ backgroundImage: `url(${category.img})` }}
							/>
							<CardHeader className="text-center">
								<CardTitle className="text-2xl font-extralight tracking-[0.2em] text-white/90 group-hover:text-white transition-colors">
									{category.title}
								</CardTitle>
								<CardDescription className="text-white/40 font-light text-lg tracking-wide">
									{category.subtitle}
								</CardDescription>
							</CardHeader>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}
