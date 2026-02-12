-- CreateTable
CREATE TABLE "bottles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "brand" TEXT,
    "proof" DOUBLE PRECISION,
    "taste_note" TEXT,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'IN_STOCK',
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bottles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cocktails" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "taste_note" TEXT,
    "method" TEXT,
    "status" TEXT NOT NULL DEFAULT 'IN_STOCK',
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cocktails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cocktail_ingredients" (
    "id" SERIAL NOT NULL,
    "cocktail_id" INTEGER NOT NULL,
    "bottle_id" INTEGER,
    "name" TEXT,
    "quantity" TEXT,

    CONSTRAINT "cocktail_ingredients_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cocktail_ingredients" ADD CONSTRAINT "cocktail_ingredients_cocktail_id_fkey" FOREIGN KEY ("cocktail_id") REFERENCES "cocktails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cocktail_ingredients" ADD CONSTRAINT "cocktail_ingredients_bottle_id_fkey" FOREIGN KEY ("bottle_id") REFERENCES "bottles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
