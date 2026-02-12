"use client";

import type { Bottle } from "@prisma/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/core/components/ui/button";

interface BottleListProps {
	initialBottles: Bottle[];
}

export default function BottleList({ initialBottles }: BottleListProps) {
	const router = useRouter();

	const handleDelete = async (id: number) => {
		if (!confirm("本当にこのボトルを削除しますか？")) return;

		try {
			const res = await fetch(`/api/bottles/${id}`, {
				method: "DELETE",
			});

			if (!res.ok) throw new Error("Failed to delete");
			router.refresh();
		} catch (error) {
			alert("ボトルの削除に失敗しました");
			console.error(error);
		}
	};

	const searchParams = useSearchParams();
	const currentSort = searchParams.get("sort");
	const currentOrder = searchParams.get("order");

	const getSortLink = (key: string) => {
		const nextOrder =
			currentSort === key && currentOrder === "asc" ? "desc" : "asc";
		return `/admin?sort=${key}&order=${nextOrder}`;
	};

	const getSortIcon = (key: string) => {
		if (currentSort !== key) return null;
		return currentOrder === "asc" ? " ▲" : " ▼";
	};

	return (
		<div className="bg-white dark:bg-zinc-800 shadow rounded-lg overflow-hidden">
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
					<thead className="bg-gray-50 dark:bg-zinc-700">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
								<Link href={getSortLink("id")}>ID{getSortIcon("id")}</Link>
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
								<Link href={getSortLink("name")}>名前{getSortIcon("name")}</Link>
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
								<Link href={getSortLink("category")}>
									カテゴリー{getSortIcon("category")}
								</Link>
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
								<Link href={getSortLink("status")}>
									ステータス{getSortIcon("status")}
								</Link>
							</th>
							<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
								操作
							</th>
						</tr>
					</thead>
					<tbody className="bg-white dark:bg-zinc-800 divide-y divide-gray-200 dark:divide-zinc-700">
						{initialBottles.map((bottle) => (
							<tr key={bottle.id}>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
									{bottle.id}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
									{bottle.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
									{bottle.category}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
									{bottle.status === "IN_STOCK"
										? "在庫あり"
										: bottle.status === "OUT_OF_STOCK"
											? "在庫なし"
											: "提供不可"}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
									<Link href={`/admin/bottles/${bottle.id}/edit`}>
										<Button variant="outline" size="sm">
											編集
										</Button>
									</Link>
									<Button
										variant="destructive"
										size="sm"
										onClick={() => handleDelete(bottle.id)}
									>
										削除
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
