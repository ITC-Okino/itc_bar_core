"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/core/components/ui/label";
import { Switch } from "@/core/components/ui/switch";

export function StockToggle() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const showAll = searchParams.get("showAll") === "true";

	const handleToggle = (checked: boolean) => {
		const params = new URLSearchParams(searchParams.toString());
		if (checked) {
			params.set("showAll", "true");
		} else {
			params.delete("showAll");
		}
		router.replace(`${pathname}?${params.toString()}`);
	};

	return (
		<div className="flex items-center gap-3">
			<Label
				htmlFor="stock-toggle"
				className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-light cursor-pointer select-none hover:text-white/60 transition-colors"
			>
				在庫なしを表示
			</Label>
			<Switch
				id="stock-toggle"
				checked={showAll}
				onCheckedChange={handleToggle}
				className="data-[state=checked]:bg-white/20 data-[state=unchecked]:bg-white/5 border border-white/10"
			/>
		</div>
	);
}
