import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
    title: string;
    imagePath: string;
    href: string;
}

export function CategoryCard({ title, imagePath, href }: CategoryCardProps) {
    return (
        <Link
            href={href}
            className="group relative h-64 w-full overflow-hidden rounded-xl bg-charcoal shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-gold/20"
        >
            <Image
                src={imagePath}
                alt={title}
                fill
                className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="translate-y-2 text-3xl font-light tracking-widest text-white/90 transition-all duration-500 group-hover:translate-y-0 group-hover:text-white">
                    {title}
                </h3>
            </div>
            <div className="absolute bottom-6 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gold/60 transition-all duration-500 group-hover:w-16" />
        </Link>
    );
}
