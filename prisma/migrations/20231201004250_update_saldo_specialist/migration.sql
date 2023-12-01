/*
  Warnings:

  - Made the column `specialist` on table `SaldoSpecialist` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SaldoSpecialist" DROP CONSTRAINT "SaldoSpecialist_specialist_fkey";

-- AlterTable
ALTER TABLE "SaldoSpecialist" ALTER COLUMN "specialist" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "SaldoSpecialist" ADD CONSTRAINT "SaldoSpecialist_specialist_fkey" FOREIGN KEY ("specialist") REFERENCES "Specialist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
