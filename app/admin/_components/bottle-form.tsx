"use client";

import type { Bottle } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/core/components/ui/button";
import ImageUpload from "./image-upload";

interface BottleFormProps {
	initialData?: Bottle;
}

export default function BottleForm({ initialData }: BottleFormProps) {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: initialData?.name || "",
		category: initialData?.category || "ウイスキー",
		brand: initialData?.brand || "",
		proof: initialData?.proof || "",
		tasteNote: initialData?.tasteNote || "",
		description: initialData?.description || "",
		status: initialData?.status || "IN_STOCK",
		imageUrl: initialData?.imageUrl || "",
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const url = initialData ? `/api/bottles/${initialData.id}` : "/api/bottles";
		const method = initialData ? "PUT" : "POST";

		try {
			// convert proof to number
			const data = {
				...formData,
				proof: formData.proof ? Number(formData.proof) : null,
			};

			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!res.ok) throw new Error("Failed to save");
			router.push("/admin");
			router.refresh();
		} catch (error) {
			alert("保存に失敗しました");
			console.error(error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-6 max-w-2xl bg-white dark:bg-zinc-800 p-6 rounded-lg shadow"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="md:col-span-2">
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						ボトル画像
					</label>
					<ImageUpload
						value={formData.imageUrl}
						onChange={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
						名前
					</label>
					<input
						type="text"
						name="name"
						required
						value={formData.name}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white sm:text-sm p-2 border"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
						カテゴリー
					</label>
					<select
						name="category"
						required
						value={formData.category}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white sm:text-sm p-2 border"
					>
						<option value="ウイスキー">ウイスキー</option>
						<option value="ジン">ジン</option>
						<option value="ウォッカ">ウォッカ</option>
						<option value="ラム">ラム</option>
						<option value="テキーラ">テキーラ</option>
						<option value="リキュール">リキュール</option>
						<option value="カクテル">カクテル</option>
						<option value="日本酒">日本酒</option>
						<option value="焼酎">焼酎</option>
						<option value="ワイン">ワイン</option>
						<option value="ブランデー">ブランデー</option>
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
						ブランド
					</label>
					<input
						type="text"
						name="brand"
						value={formData.brand || ""}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white sm:text-sm p-2 border"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
						度数 (%)
					</label>
					<input
						type="number"
						step="0.1"
						name="proof"
						value={formData.proof}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white sm:text-sm p-2 border"
					/>
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
					テイスティングノート
				</label>
				<input
					type="text"
					name="tasteNote"
					value={formData.tasteNote || ""}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white sm:text-sm p-2 border"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
					詳細説明
				</label>
				<textarea
					name="description"
					rows={4}
					value={formData.description || ""}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white sm:text-sm p-2 border"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
					ステータス
				</label>
				<select
					name="status"
					required
					value={formData.status}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white sm:text-sm p-2 border"
				>
					<option value="IN_STOCK">在庫あり</option>
					<option value="OUT_OF_STOCK">在庫なし</option>
					<option value="DISCONTINUED">提供不可</option>
				</select>
			</div>

			<div className="flex justify-end gap-4">
				<Button type="button" variant="outline" onClick={() => router.back()}>
					キャンセル
				</Button>
				<Button type="submit">保存</Button>
			</div>
		</form>
	);
}
