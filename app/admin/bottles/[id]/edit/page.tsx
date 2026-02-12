import { notFound } from "next/navigation";
import BottleForm from "@/app/admin/_components/bottle-form";
import { prisma } from "@/core/lib/db";

export default async function EditBottlePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const bottle = await prisma.bottle.findUnique({
		where: { id: Number(id) },
	});

	if (!bottle) notFound();

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">ボトルの編集</h1>
			<BottleForm initialData={bottle} />
		</div>
	);
}
