/*
  Warnings:

  - The values [debit,credit] on the enum `enum_saldo_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "enum_saldo_type_new" AS ENUM ('increase', 'decrease');
ALTER TABLE "SaldoSpecialist" ALTER COLUMN "type" TYPE "enum_saldo_type_new" USING ("type"::text::"enum_saldo_type_new");
ALTER TYPE "enum_saldo_type" RENAME TO "enum_saldo_type_old";
ALTER TYPE "enum_saldo_type_new" RENAME TO "enum_saldo_type";
DROP TYPE "enum_saldo_type_old";
COMMIT;
