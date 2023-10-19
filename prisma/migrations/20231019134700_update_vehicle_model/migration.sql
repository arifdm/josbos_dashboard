/*
  Warnings:

  - The `size` column on the `VehicleModel` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "enum_size" AS ENUM ('small', 'middle', 'big');

-- AlterTable
ALTER TABLE "VehicleModel" DROP COLUMN "size",
ADD COLUMN     "size" "enum_size" DEFAULT 'middle';
