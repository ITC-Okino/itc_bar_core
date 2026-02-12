import { NextResponse } from "next/server";
import { prisma } from "@/core/lib/db";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const category = searchParams.get("category");

		const where = category
			? {
					category: {
						contains: category,
					},
				}
			: {};

		const bottles = await prisma.bottle.findMany({
			where,
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json(bottles);
	} catch (error) {
		console.error("Failed to fetch bottles:", error);
		return NextResponse.json(
			{ error: "Failed to fetch bottles" },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	try {
		const json = await request.json();
		const bottle = await prisma.bottle.create({
			data: json,
		});
		return NextResponse.json(bottle);
	} catch (error) {
		console.error("Failed to create bottle:", error);
		return NextResponse.json(
			{ error: "Failed to create bottle" },
			{ status: 500 },
		);
	}
}
