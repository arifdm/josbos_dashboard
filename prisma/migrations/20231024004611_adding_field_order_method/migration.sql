/*
  Warnings:

  - Added the required column `orderMethod` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Made the column `city` on table `ServicePricing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vehicleModel` on table `ServicePricing` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ServicePricing" DROP CONSTRAINT "ServicePricing_city_fkey";

-- DropForeignKey
ALTER TABLE "ServicePricing" DROP CONSTRAINT "ServicePricing_vehicleModel_fkey";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "orderMethod" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "ServicePricing" ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "vehicleModel" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ServicePricing" ADD CONSTRAINT "ServicePricing_city_fkey" FOREIGN KEY ("city") REFERENCES "Cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePricing" ADD CONSTRAINT "ServicePricing_vehicleModel_fkey" FOREIGN KEY ("vehicleModel") REFERENCES "VehicleModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
