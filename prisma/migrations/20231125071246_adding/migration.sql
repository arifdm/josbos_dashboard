-- CreateTable
CREATE TABLE "Deposit" (
    "id" TEXT NOT NULL,
    "debet" INTEGER,
    "kredit" INTEGER,
    "note" TEXT,
    "status" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "specialist" TEXT,

    CONSTRAINT "Deposit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Deposit" ADD CONSTRAINT "Deposit_specialist_fkey" FOREIGN KEY ("specialist") REFERENCES "Specialist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
