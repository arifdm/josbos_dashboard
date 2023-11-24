-- AlterTable
ALTER TABLE "ServicePriceOnSpecialist" ADD COLUMN     "priceDescription" VARCHAR(200);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;
