import Link from "next/link";

export default function Home() {
	return (
		<div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
			{/* Background Image with Overlay */}
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: "url(/img/whisky.png)" }}
			/>
			<div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

			{/* Ambient Glow Effects */}
			<div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] animate-pulse" />
			<div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-amber-700/5 rounded-full blur-[100px] animate-pulse delay-1000" />

			{/* Content */}
			<main className="relative z-10 flex flex-col items-center gap-12 text-center px-4">
				{/* Top Decorative Line */}
				<div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-1000">
					<div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]/40" />
					<span className="text-[10px] tracking-[0.5em] uppercase text-[#d4af37]/40 font-light">
						Est. 2026
					</span>
					<div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]/40" />
				</div>

				{/* Main Title */}
				<div className="animate-in fade-in zoom-in-95 duration-1000 delay-200">
					<h1
						className="text-7xl md:text-9xl font-bold tracking-[0.15em] mb-6"
						style={{
							fontFamily: "var(--font-playfair), serif",
							background: "linear-gradient(135deg, #ffffff 0%, #d4af37 40%, #f5e6a3 60%, #d4af37 100%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							textShadow: "none",
							filter: "drop-shadow(0 0 40px rgba(212,175,55,0.15))",
						}}
					>
						ITCBAR
					</h1>
					<div className="flex items-center justify-center gap-4">
						<div className="h-px w-24 bg-gradient-to-r from-transparent to-[#d4af37]/50" />
						<div className="w-2 h-2 rotate-45 border border-[#d4af37]/40" />
						<div className="h-px w-24 bg-gradient-to-l from-transparent to-[#d4af37]/50" />
					</div>
				</div>

				{/* Subtitle */}
				<p className="text-sm md:text-base font-light text-white/40 tracking-[0.2em] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
					新たなお酒の出会いのお供に
				</p>

				{/* CTA Button  */}
				<Link
					href="/menu"
					className="group animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700"
				>
					<div className="relative px-12 py-4 border border-[#d4af37]/30 hover:border-[#d4af37]/60 rounded-none transition-all duration-500 hover:bg-[#d4af37]/5 backdrop-blur-md">
						<span className="text-sm tracking-[0.3em] text-[#d4af37]/80 group-hover:text-[#d4af37] transition-colors font-light">
							メニューを見る
						</span>
					</div>
				</Link>
			</main>

			{/* Footer */}
			<footer className="absolute bottom-8 z-10 text-white/15 text-[10px] tracking-[0.4em] uppercase font-extralight animate-in fade-in duration-1000 delay-1000">
				© 2026 ITCBAR — All Rights Reserved
			</footer>
		</div>
	);
}

