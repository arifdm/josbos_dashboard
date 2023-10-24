-- CreateTable
CREATE TABLE "Promo" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255),
    "content" TEXT,
    "image" VARCHAR(255),
    "rating" INTEGER NOT NULL DEFAULT 0,
    "status" "enum_status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_promo_fkey" FOREIGN KEY ("promo") REFERENCES "Promo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
