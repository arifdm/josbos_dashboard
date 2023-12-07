-- DropForeignKey
ALTER TABLE "ServicePriceOnSpecialist" DROP CONSTRAINT "ServicePriceOnSpecialist_city_fkey";

-- AlterTable
ALTER TABLE "ServicePriceOnSpecialist" ALTER COLUMN "city" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ServicePriceOnSpecialist" ADD CONSTRAINT "ServicePriceOnSpecialist_city_fkey" FOREIGN KEY ("city") REFERENCES "Cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
