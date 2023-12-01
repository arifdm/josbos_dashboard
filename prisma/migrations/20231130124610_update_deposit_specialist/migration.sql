-- CreateEnum
CREATE TYPE "enum_saldo_type" AS ENUM ('debit', 'credit');

-- AlterTable
ALTER TABLE "BankAccount" ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "category" DROP DEFAULT;

-- AlterTable
ALTER TABLE "SaldoSpecialist" ADD COLUMN     "type" "enum_saldo_type";
