/*
  Warnings:

  - You are about to drop the column `type` on the `VehicleModels` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "VehicleModels" DROP CONSTRAINT "VehicleModels_type_fkey";

-- AlterTable
ALTER TABLE "VehicleModels" DROP COLUMN "type",
ADD COLUMN     "vehicleTypesId" TEXT;

-- AddForeignKey
ALTER TABLE "VehicleModels" ADD CONSTRAINT "VehicleModels_vehicleTypesId_fkey" FOREIGN KEY ("vehicleTypesId") REFERENCES "VehicleTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
