-- AlterTable
ALTER TABLE "Specialist" ADD COLUMN     "refreshToken" VARCHAR(255);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" VARCHAR(255);
