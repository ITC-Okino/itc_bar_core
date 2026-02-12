import Link from "next/link";
import { Button } from "@/core/components/ui/button";
import { prisma } from "@/core/lib/db";
import BottleList from "./_components/bottle-list";



interface AdminPageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminPage({
	searchParams,
}: AdminPageProps) {
	const params = await searchParams;
	const sort = typeof params.sort === "string" ? params.sort : "createdAt";
	const order = typeof params.order === "string" ? params.order : "desc";

	const orderBy = {
		[sort]: order as "asc" | "desc",
	};

	const bottles = await prisma.bottle.findMany({
		orderBy,
	});

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<div className="flex items-center gap-4">
					<h1 className="text-2xl font-bold">ボトル管理</h1>
					<Link href="/admin/cocktails">
						<Button variant="outline" size="sm">
							🍸 カクテル管理
						</Button>
					</Link>
				</div>
				<Link href="/admin/bottles/new">
					<Button>新規ボトル登録</Button>
				</Link>
			</div>
			<BottleList initialBottles={bottles} />
		</div>
	);
}
