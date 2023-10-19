/*
  Warnings:

  - You are about to drop the column `vehicleTypesId` on the `VehicleModels` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "VehicleModels" DROP CONSTRAINT "VehicleModels_vehicleTypesId_fkey";

-- AlterTable
ALTER TABLE "VehicleModels" DROP COLUMN "vehicleTypesId",
ADD COLUMN     "type" TEXT;

-- AddForeignKey
ALTER TABLE "VehicleModels" ADD CONSTRAINT "VehicleModels_type_fkey" FOREIGN KEY ("type") REFERENCES "VehicleTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
