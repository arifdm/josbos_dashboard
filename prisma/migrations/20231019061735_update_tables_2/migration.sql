/*
  Warnings:

  - You are about to drop the column `type` on the `VehicleModel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "VehicleModel" DROP CONSTRAINT "VehicleModel_type_fkey";

-- AlterTable
ALTER TABLE "VehicleModel" DROP COLUMN "type";
