/*
  Warnings:

  - You are about to drop the column `rating` on the `Promo` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "enum_promo_type" AS ENUM ('amount', 'percent');

-- AlterTable
ALTER TABLE "Promo" DROP COLUMN "rating",
ADD COLUMN     "code" VARCHAR(255),
ADD COLUMN     "discount" INTEGER,
ADD COLUMN     "limitCount" INTEGER,
ADD COLUMN     "maxDiscount" INTEGER,
ADD COLUMN     "type" "enum_promo_type";
