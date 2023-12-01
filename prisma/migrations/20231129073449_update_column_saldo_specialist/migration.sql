-- AlterTable
ALTER TABLE "SaldoSpecialist" ADD COLUMN     "transaction" TEXT;

-- AddForeignKey
ALTER TABLE "SaldoSpecialist" ADD CONSTRAINT "SaldoSpecialist_transaction_fkey" FOREIGN KEY ("transaction") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
