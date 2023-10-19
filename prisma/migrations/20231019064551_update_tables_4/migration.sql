/*
  Warnings:

  - You are about to drop the column `vehicleModel` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_vehicleModel_fkey";

-- AlterTable
ALTER TABLE "ServicePricing" ADD COLUMN     "vehicleModel" TEXT;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "vehicleModel";

-- AddForeignKey
ALTER TABLE "ServicePricing" ADD CONSTRAINT "ServicePricing_vehicleModel_fkey" FOREIGN KEY ("vehicleModel") REFERENCES "VehicleModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
