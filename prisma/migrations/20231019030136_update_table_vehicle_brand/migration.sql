/*
  Warnings:

  - You are about to drop the column `userID` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleModelID` on the `Transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_userID_fkey";

-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_vehicleModelID_fkey";

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "userID",
DROP COLUMN "vehicleModelID",
ADD COLUMN     "user" TEXT,
ADD COLUMN     "vehicleModel" TEXT;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_vehicleModel_fkey" FOREIGN KEY ("vehicleModel") REFERENCES "VehicleModels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
