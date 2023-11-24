/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `Specialist` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Specialist" DROP COLUMN "refreshToken";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "refreshToken";
