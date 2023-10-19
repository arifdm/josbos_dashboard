/*
  Warnings:

  - You are about to drop the column `city` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_city_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "city",
ADD COLUMN     "price" TEXT;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_price_fkey" FOREIGN KEY ("price") REFERENCES "ServicePricing"("id") ON DELETE SET NULL ON UPDATE CASCADE;
