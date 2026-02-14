export const CATEGORY_MAP: Record<string, { title: string; search: string }> = {
    whisky: { title: "WHISKY", search: "イスキー" },
    gin: { title: "GIN", search: "ジン" },
    vodka: { title: "VODKA", search: "ウォッカ" },
    rum: { title: "RUM", search: "ラム" },
    tequila: { title: "TEQUILA", search: "テキーラ" },
    liqueur: { title: "LIQUEUR", search: "リキュール" },
    cocktail: { title: "COCKTAIL", search: "カクテル" },
    mocktail: { title: "MOCKTAIL", search: "ノンアル" },
    other: { title: "OTHER", search: "その他" },
};

export const OTHER_SUBCATEGORIES = {
    sake: { title: "日本酒", search: "日本酒" },
    shochu: { title: "焼酎", search: "焼酎" },
    wine: { title: "ワイン", search: "ワイン" },
    brandy: { title: "ブランデー", search: "ブランデー" },
} as const;

export function getSlugFromCategory(category: string): string {
    // Check main categories first
    const mainEntry = Object.entries(CATEGORY_MAP).find(([_, config]) =>
        category.includes(config.search),
    );
    if (mainEntry) return mainEntry[0];

    // Check subcategories
    const subEntry = Object.entries(OTHER_SUBCATEGORIES).find(([_, config]) =>
        category.includes(config.search),
    );
    if (subEntry) return subEntry[0];

    return "other";
}
