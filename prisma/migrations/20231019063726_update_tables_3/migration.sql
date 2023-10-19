/*
  Warnings:

  - You are about to drop the column `type` on the `Service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_type_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "type",
ADD COLUMN     "vehicleModel" TEXT;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_vehicleModel_fkey" FOREIGN KEY ("vehicleModel") REFERENCES "VehicleModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
