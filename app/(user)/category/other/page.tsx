import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { OTHER_SUBCATEGORIES } from "@/core/lib/categories";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/core/components/ui/card";

export default async function OtherCategoryPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] p-8 md:p-16">
            <header className="max-w-6xl mx-auto mb-16 flex items-center gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
                <Link
                    href="/menu"
                    className="p-2 rounded-full border border-white/10 hover:bg-white/5 text-white/60 hover:text-white transition-all"
                >
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-4xl md:text-5xl font-extralight tracking-[0.3em] text-white uppercase">
                    Other
                </h1>
            </header>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                {Object.entries(OTHER_SUBCATEGORIES).map(([slug, config]) => (
                    <Link
                        href={`/category/${slug}`}
                        key={slug}
                        className="group block"
                    >
                        <Card className="bg-zinc-900/50 border-zinc-800/50 group-hover:border-white/20 transition-all duration-500 backdrop-blur-sm h-full p-12">
                            <CardHeader className="text-center space-y-4">
                                <CardTitle className="text-3xl md:text-4xl font-extralight tracking-[0.2em] text-white/90 group-hover:text-white transition-colors uppercase">
                                    {config.title}
                                </CardTitle>
                                <CardDescription className="text-white/40 font-light text-lg tracking-wide">
                                    {config.search}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </main>
    );
}
