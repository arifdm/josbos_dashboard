/*
  Warnings:

  - You are about to drop the column `debet` on the `SaldoSpecialist` table. All the data in the column will be lost.
  - You are about to drop the column `kredit` on the `SaldoSpecialist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SaldoSpecialist" DROP COLUMN "debet",
DROP COLUMN "kredit",
ADD COLUMN     "amount" INTEGER,
ADD COLUMN     "saldo" INTEGER;
