/*
  Warnings:

  - You are about to drop the column `serviceId` on the `VehicleModel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "VehicleModel" DROP CONSTRAINT "VehicleModel_serviceId_fkey";

-- AlterTable
ALTER TABLE "VehicleModel" DROP COLUMN "serviceId";
