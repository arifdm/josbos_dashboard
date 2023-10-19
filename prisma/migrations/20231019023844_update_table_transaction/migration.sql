/*
  Warnings:

  - You are about to drop the column `user` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `vehicle` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the `Vehicles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_user_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_vehicle_fkey";

-- DropForeignKey
ALTER TABLE "Vehicles" DROP CONSTRAINT "Vehicles_brand_fkey";

-- DropForeignKey
ALTER TABLE "Vehicles" DROP CONSTRAINT "Vehicles_model_fkey";

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "user",
DROP COLUMN "vehicle",
ADD COLUMN     "userID" TEXT,
ADD COLUMN     "vehicleModelID" TEXT;

-- DropTable
DROP TABLE "Vehicles";

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_vehicleModelID_fkey" FOREIGN KEY ("vehicleModelID") REFERENCES "VehicleModels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
