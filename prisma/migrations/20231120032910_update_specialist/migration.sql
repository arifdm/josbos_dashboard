/*
  Warnings:

  - Made the column `name` on table `Specialist` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Specialist` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Specialist" ADD COLUMN     "email" VARCHAR(100),
ADD COLUMN     "ktp" VARCHAR(20),
ADD COLUMN     "otp" VARCHAR(10),
ADD COLUMN     "password" VARCHAR(100),
ADD COLUMN     "tokenFCM" VARCHAR(255),
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "alasanBatal" VARCHAR(255);
