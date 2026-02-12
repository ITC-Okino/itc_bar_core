"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/core/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    disabled?: boolean;
}

export default function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            onChange(data.url);
        } catch (error) {
            console.error("Upload error:", error);
            alert("画像のアップロードに失敗しました");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="relative w-40 h-40 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-lg overflow-hidden bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center">
                    {value ? (
                        <>
                            <Image
                                src={value}
                                alt="Upload"
                                fill
                                className="object-cover"
                            />
                            {!disabled && (
                                <button
                                    onClick={() => onChange("")}
                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-sm"
                                    type="button"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center text-gray-400 dark:text-zinc-500">
                            {uploading ? (
                                <Loader2 className="w-8 h-8 animate-spin" />
                            ) : (
                                <>
                                    <Upload className="w-8 h-8 mb-2" />
                                    <span className="text-xs">画像をアップロード</span>
                                </>
                            )}
                        </div>
                    )}
                </div>
                {!disabled && !value && (
                    <label className="cursor-pointer">
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                        <Button type="button" variant="outline" size="sm" asChild>
                            <span>ファイルを選択</span>
                        </Button>
                    </label>
                )}
            </div>
        </div>
    );
}
