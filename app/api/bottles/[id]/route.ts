import { NextResponse } from "next/server";
import { prisma } from "@/core/lib/db";

export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const json = await request.json();
		const bottle = await prisma.bottle.update({
			where: { id: Number(id) },
			data: json,
		});
		return NextResponse.json(bottle);
	} catch (error) {
		console.error("Failed to update bottle:", error);
		return NextResponse.json(
			{ error: "Failed to update bottle" },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		await prisma.bottle.delete({
			where: { id: Number(id) },
		});
		return new NextResponse(null, { status: 204 });
	} catch (error) {
		console.error("Failed to delete bottle:", error);
		return NextResponse.json(
			{ error: "Failed to delete bottle" },
			{ status: 500 },
		);
	}
}
