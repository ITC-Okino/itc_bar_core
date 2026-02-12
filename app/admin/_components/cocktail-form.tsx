"use client";

import type { Bottle } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/core/components/ui/button";

interface Ingredient {
    bottleId?: number | null;
    name: string;
    quantity: string;
}

interface CocktailFormProps {
    initialData?: {
        id: number;
        name: string;
        description: string | null;
        tasteNote: string | null;
        method: string | null;
        status: string;
        imageUrl: string | null;
        isNonAlcoholic: boolean;
        ingredients: {
            id: number;
            bottleId: number | null;
            name: string | null;
            quantity: string | null;
            bottle: Bottle | null;
        }[];
    };
    bottles: Bottle[];
}

import ImageUpload from "./image-upload";

export default function CocktailForm({
    initialData,
    bottles,
}: CocktailFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        description: initialData?.description || "",
        tasteNote: initialData?.tasteNote || "",
        method: initialData?.method || "build",
        status: initialData?.status || "IN_STOCK",
        imageUrl: initialData?.imageUrl || "",
        isNonAlcoholic: initialData?.isNonAlcoholic || false,
    });

    const [ingredients, setIngredients] = useState<Ingredient[]>(
        initialData?.ingredients.map((ing) => ({
            bottleId: ing.bottleId,
            name: ing.bottle?.name || ing.name || "",
            quantity: ing.quantity || "",
        })) || [{ bottleId: null, name: "", quantity: "" }],
    );

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const addIngredient = () => {
        setIngredients((prev) => [
            ...prev,
            { bottleId: null, name: "", quantity: "" },
        ]);
    };

    const removeIngredient = (index: number) => {
        setIngredients((prev) => prev.filter((_, i) => i !== index));
    };

    const updateIngredient = (
        index: number,
        field: keyof Ingredient,
        value: string | number | null,
    ) => {
        setIngredients((prev) =>
            prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing)),
        );
    };

    const handleBottleSelect = (index: number, bottleIdStr: string) => {
        if (bottleIdStr === "") {
            updateIngredient(index, "bottleId", null);
        } else {
            const bottleId = Number(bottleIdStr);
            const bottle = bottles.find((b) => b.id === bottleId);
            updateIngredient(index, "bottleId", bottleId);
            if (bottle) {
                updateIngredient(index, "name", bottle.name);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = initialData
            ? `/api/cocktails/${initialData.id}`
            : "/api/cocktails";
        const method = initialData ? "PUT" : "POST";

        try {
            const data = {
                ...formData,
                ingredients: ingredients
                    .filter((ing) => ing.name.trim() !== "")
                    .map((ing) => ({
                        bottleId: ing.bottleId || null,
                        name: ing.bottleId ? null : ing.name,
                        quantity: ing.quantity || null,
                    })),
            };

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Failed to save");
            router.push("/admin/cocktails");
            router.refresh();
        } catch (error) {
            alert("保存に失敗しました");
            console.error(error);
        }
    };

    const inputClass =
        "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white sm:text-sm p-2 border";

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-2xl bg-white dark:bg-zinc-800 p-6 rounded-lg shadow"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        カクテル画像
                    </label>
                    <ImageUpload
                        value={formData.imageUrl}
                        onChange={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        カクテル名
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass}
                    />
                    <div className="mt-4 flex items-center">
                        <input
                            type="checkbox"
                            id="isNonAlcoholic"
                            name="isNonAlcoholic"
                            checked={formData.isNonAlcoholic}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="isNonAlcoholic"
                            className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                        >
                            ノンアルコール
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        作り方
                    </label>
                    <select
                        name="method"
                        value={formData.method}
                        onChange={handleChange}
                        className={inputClass}
                    >
                        <option value="build">ビルド</option>
                        <option value="shake">シェイク</option>
                        <option value="stir">ステア</option>
                        <option value="blend">ブレンド</option>
                    </select>
                </div>
            </div>

            {/* Ingredients Section */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        材料
                    </label>
                    <Button type="button" variant="outline" size="sm" onClick={addIngredient}>
                        ＋ 材料を追加
                    </Button>
                </div>
                <div className="space-y-3">
                    {ingredients.map((ing, index) => (
                        <div
                            key={`ingredient-${index}`}
                            className="grid grid-cols-[140px_1fr_80px_auto] gap-2 p-3 bg-zinc-50 dark:bg-zinc-700/50 rounded-md items-center"
                        >
                            <select
                                value={ing.bottleId ?? ""}
                                onChange={(e) => handleBottleSelect(index, e.target.value)}
                                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white text-xs p-2 border h-[38px]"
                            >
                                <option value="">フリーテキスト</option>
                                {bottles.map((b) => (
                                    <option key={b.id} value={b.id}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="素材名"
                                value={ing.name}
                                onChange={(e) =>
                                    updateIngredient(index, "name", e.target.value)
                                }
                                disabled={!!ing.bottleId}
                                className={`rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white sm:text-sm p-2 border h-[38px] ${ing.bottleId ? "opacity-50" : ""
                                    }`}
                            />
                            <input
                                type="text"
                                placeholder="分量"
                                value={ing.quantity}
                                onChange={(e) =>
                                    updateIngredient(index, "quantity", e.target.value)
                                }
                                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white sm:text-sm p-2 border h-[38px]"
                            />
                            {ingredients.length > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeIngredient(index)}
                                    className="text-red-500 hover:text-red-700 h-[38px] w-[38px] p-0"
                                >
                                    ✕
                                </Button>
                            )}
                        </div>
                    ))}
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
                    placeholder="例: 爽やかな柑橘系の香りとほのかな甘み"
                    className={inputClass}
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
                    className={inputClass}
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
                    className={inputClass}
                >
                    <option value="IN_STOCK">提供可能</option>
                    <option value="OUT_OF_STOCK">提供不可</option>
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
