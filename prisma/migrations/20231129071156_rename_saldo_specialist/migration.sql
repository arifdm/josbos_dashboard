/*
  Warnings:

  - You are about to drop the `Deposit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Deposit" DROP CONSTRAINT "Deposit_specialist_fkey";

-- DropTable
DROP TABLE "Deposit";

-- CreateTable
CREATE TABLE "SaldoSpecialist" (
    "id" TEXT NOT NULL,
    "debet" INTEGER,
    "kredit" INTEGER,
    "note" TEXT,
    "status" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "specialist" TEXT,

    CONSTRAINT "SaldoSpecialist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SaldoSpecialist" ADD CONSTRAINT "SaldoSpecialist_specialist_fkey" FOREIGN KEY ("specialist") REFERENCES "Specialist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
