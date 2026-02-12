import Link from "next/link";
import { prisma } from "@/core/lib/db";
import { Button } from "@/core/components/ui/button";
import CocktailDeleteButton from "@/app/admin/_components/cocktail-delete-button";

export default async function AdminCocktailsPage() {
    const cocktails = await prisma.cocktail.findMany({
        include: {
            ingredients: {
                include: { bottle: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin"
                            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            ← 管理トップ
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            カクテル管理
                        </h1>
                    </div>
                    <Link href="/admin/cocktails/new">
                        <Button>＋ 新規カクテル</Button>
                    </Link>
                </div>

                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
                        <thead className="bg-gray-50 dark:bg-zinc-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    カクテル名
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    作り方
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    材料数
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    ステータス
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
                            {cocktails.map((cocktail) => (
                                <tr key={cocktail.id}>
                                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                                        {cocktail.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {cocktail.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 capitalize">
                                        {cocktail.method === "shake"
                                            ? "シェイク"
                                            : cocktail.method === "stir"
                                                ? "ステア"
                                                : cocktail.method === "blend"
                                                    ? "ブレンド"
                                                    : "ビルド"}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        {cocktail.ingredients.length}種
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span
                                            className={
                                                cocktail.status === "IN_STOCK"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }
                                        >
                                            {cocktail.status === "IN_STOCK"
                                                ? "提供可能"
                                                : "提供不可"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm space-x-2">
                                        <Link
                                            href={`/admin/cocktails/${cocktail.id}/edit`}
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                                        >
                                            編集
                                        </Link>
                                        <CocktailDeleteButton id={cocktail.id} />
                                    </td>
                                </tr>
                            ))}
                            {cocktails.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                                    >
                                        カクテルがまだ登録されていません
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
