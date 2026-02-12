"use client";

import { deleteCocktail } from "../_actions/cocktail";

interface CocktailDeleteButtonProps {
    id: number;
}

export default function CocktailDeleteButton({ id }: CocktailDeleteButtonProps) {
    return (
        <button
            type="button"
            className="text-red-600 hover:text-red-800 dark:text-red-400"
            onClick={async () => {
                if (confirm("本当に削除しますか？")) {
                    try {
                        await deleteCocktail(id);
                    } catch (error) {
                        alert("削除に失敗しました");
                        console.error(error);
                    }
                }
            }}
        >
            削除
        </button>
    );
}
