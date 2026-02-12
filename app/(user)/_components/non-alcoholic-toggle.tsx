"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Switch } from "@/core/components/ui/switch";
import { Label } from "@/core/components/ui/label";

export function NonAlcoholicToggle() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const isNonAlcoholic = searchParams.get("non_alcoholic") === "true";

    const handleToggle = (checked: boolean) => {
        const params = new URLSearchParams(searchParams);
        if (checked) {
            params.set("non_alcoholic", "true");
        } else {
            params.delete("non_alcoholic");
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    // Only show on cocktail category page if needed, but this component can be placed conditionally
    // For now, it just toggles the param.

    return (
        <div className="flex items-center space-x-2 bg-zinc-900/50 p-2 rounded-lg border border-zinc-800/50 backdrop-blur-sm">
            <Switch
                id="non-alcoholic-mode"
                checked={isNonAlcoholic}
                onCheckedChange={handleToggle}
            />
            <Label htmlFor="non-alcoholic-mode" className="text-white/60 text-xs tracking-wider cursor-pointer">
                NON-ALCOHOLIC
            </Label>
        </div>
    );
}
