"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/core/lib/utils";

export function SplashScreen() {
	const [isVisible, setIsVisible] = useState(true);
	const [isFading, setIsFading] = useState(false);

	useEffect(() => {
		// Check if splash has already been shown in this session
		const hasShownSplash = sessionStorage.getItem("hasShownSplash");
		if (hasShownSplash) {
			setIsVisible(false);
			return;
		}

		// Prevent scrolling when splash screen is visible
		if (isVisible) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		const fadeTimer = setTimeout(() => {
			setIsFading(true);
		}, 4800); // Start fading out after 4.8s

		const removeTimer = setTimeout(() => {
			setIsVisible(false);
			sessionStorage.setItem("hasShownSplash", "true");
		}, 5300); // Remove from DOM after 5.3s

		return () => {
			clearTimeout(fadeTimer);
			clearTimeout(removeTimer);
			document.body.style.overflow = "unset";
		};
	}, [isVisible]);

	if (!isVisible) return null;

	return (
		<div
			className={cn(
				"fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500",
				isFading ? "opacity-0" : "opacity-100",
			)}
		>
			<div className="relative h-64 w-64 md:h-96 md:w-96">
				<Image
					src="/img/itc_splash.gif"
					alt="ITC Splash Screen"
					fill
					className="object-contain"
					priority
					unoptimized
				/>
			</div>
		</div>
	);
}
