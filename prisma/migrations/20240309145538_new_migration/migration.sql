-- CreateEnum
CREATE TYPE "enum_admins_role" AS ENUM ('super admin', 'accounting', 'admin');

-- CreateEnum
CREATE TYPE "enum_status" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "enum_account_type" AS ENUM ('bank_transfer', 'e_wallet', 'qris', 'cash');

-- CreateEnum
CREATE TYPE "enum_promo_type" AS ENUM ('amount', 'percent');

-- CreateEnum
CREATE TYPE "enum_saldo_type" AS ENUM ('increase', 'decrease');

-- CreateEnum
CREATE TYPE "enum_size" AS ENUM ('small', 'middle', 'big');

-- CreateEnum
CREATE TYPE "enum_specialists_status" AS ENUM ('online', 'offline', 'banned', 'pending');

-- CreateEnum
CREATE TYPE "enum_transactions_status" AS ENUM ('pending', 'taken', 'process', 'unpaid', 'paid', 'completed', 'canceled');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "name" VARCHAR(50),
    "username" VARCHAR(50),
    "password" VARCHAR(100),
    "phone" VARCHAR(20),
    "role" "enum_admins_role" DEFAULT 'admin',
    "status" "enum_status" DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(100),
    "name" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "address" VARCHAR(150),
    "city" VARCHAR(50),
    "ktp" VARCHAR(20),
    "photo" TEXT,
    "otp" VARCHAR(10),
    "tokenFCM" VARCHAR(255),
    "status" "enum_status" DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "password" VARCHAR(100),
    "referral" VARCHAR(100),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255),
    "content" TEXT,
    "image" VARCHAR(255),
    "rating" INTEGER NOT NULL DEFAULT 0,
    "status" "enum_status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promo" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255),
    "content" TEXT,
    "image" VARCHAR(255),
    "code" VARCHAR(255),
    "type" "enum_promo_type",
    "discount" INTEGER,
    "limitCount" INTEGER,
    "maxDiscount" INTEGER,
    "status" "enum_status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "address" TEXT,
    "latitude" VARCHAR(20),
    "longitude" VARCHAR(20),
    "amount" INTEGER,
    "discount" INTEGER,
    "total" INTEGER,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderDate" TIMESTAMP(3),
    "status" "enum_transactions_status" NOT NULL DEFAULT 'pending',
    "promo" TEXT,
    "servicePrice" TEXT,
    "user" TEXT,
    "vehicleModel" TEXT,
    "payment" TEXT,
    "alasanBatal" VARCHAR(255),

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TakeOnTransaction" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "selected" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderMethod" VARCHAR(100),
    "amountBids" INTEGER,
    "rating" INTEGER,
    "ratingComment" VARCHAR(250),
    "serviceDate" TIMESTAMP(3),
    "specialist" TEXT,
    "servicePriceOnSpecialist" TEXT,
    "transaction" TEXT NOT NULL,
    "feeOrder" INTEGER,
    "partnerRevenue" INTEGER,

    CONSTRAINT "TakeOnTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "icon" VARCHAR(255),
    "orderFee" INTEGER,
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "icon" VARCHAR(255),
    "status" BOOLEAN DEFAULT true,
    "orderMethod" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specialist" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "address" TEXT,
    "latitude" VARCHAR(20),
    "longitude" VARCHAR(20),
    "phone" VARCHAR(50) NOT NULL,
    "photo" TEXT,
    "balances" INTEGER,
    "status" "enum_specialists_status" DEFAULT 'offline',
    "rating" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "city" TEXT,
    "email" VARCHAR(100),
    "ktp" VARCHAR(20),
    "otp" VARCHAR(10),
    "password" VARCHAR(100),
    "tokenFCM" VARCHAR(255),

    CONSTRAINT "Specialist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicePricing" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL,
    "service" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "vehicleSize" TEXT,

    CONSTRAINT "ServicePricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicePriceOnSpecialist" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL,
    "service" TEXT NOT NULL,
    "specialist" TEXT NOT NULL,
    "city" TEXT,
    "vehicleSize" TEXT,
    "priceDescription" VARCHAR(200),
    "maxDistance" INTEGER,

    CONSTRAINT "ServicePriceOnSpecialist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleSize" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cities" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleType" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleBrand" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "VehicleBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleModel" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "brand" TEXT NOT NULL,
    "vehicleSize" TEXT,

    CONSTRAINT "VehicleModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" TEXT NOT NULL,
    "category" "enum_account_type",
    "brandName" VARCHAR(100) NOT NULL,
    "accountName" VARCHAR(100) NOT NULL,
    "number" VARCHAR(50),
    "isOnline" BOOLEAN NOT NULL DEFAULT true,
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "specialist" TEXT,
    "user" TEXT,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaldoSpecialist" (
    "id" TEXT NOT NULL,
    "note" TEXT,
    "status" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "specialist" TEXT NOT NULL,
    "amount" INTEGER,
    "saldo" INTEGER,
    "transaction" TEXT,
    "type" "enum_saldo_type",

    CONSTRAINT "SaldoSpecialist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_phone_key" ON "Admin"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_payment_fkey" FOREIGN KEY ("payment") REFERENCES "BankAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_promo_fkey" FOREIGN KEY ("promo") REFERENCES "Promo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_servicePrice_fkey" FOREIGN KEY ("servicePrice") REFERENCES "ServicePricing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_vehicleModel_fkey" FOREIGN KEY ("vehicleModel") REFERENCES "VehicleModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TakeOnTransaction" ADD CONSTRAINT "TakeOnTransaction_servicePriceOnSpecialist_fkey" FOREIGN KEY ("servicePriceOnSpecialist") REFERENCES "ServicePriceOnSpecialist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TakeOnTransaction" ADD CONSTRAINT "TakeOnTransaction_specialist_fkey" FOREIGN KEY ("specialist") REFERENCES "Specialist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TakeOnTransaction" ADD CONSTRAINT "TakeOnTransaction_transaction_fkey" FOREIGN KEY ("transaction") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Specialist" ADD CONSTRAINT "Specialist_city_fkey" FOREIGN KEY ("city") REFERENCES "Cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePricing" ADD CONSTRAINT "ServicePricing_city_fkey" FOREIGN KEY ("city") REFERENCES "Cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePricing" ADD CONSTRAINT "ServicePricing_service_fkey" FOREIGN KEY ("service") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePricing" ADD CONSTRAINT "ServicePricing_vehicleSize_fkey" FOREIGN KEY ("vehicleSize") REFERENCES "VehicleSize"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePriceOnSpecialist" ADD CONSTRAINT "public_ServicePriceOnSpecialist_city_fkey" FOREIGN KEY ("city") REFERENCES "Cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePriceOnSpecialist" ADD CONSTRAINT "public_ServicePriceOnSpecialist_service_fkey" FOREIGN KEY ("service") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePriceOnSpecialist" ADD CONSTRAINT "public_ServicePriceOnSpecialist_specialist_fkey" FOREIGN KEY ("specialist") REFERENCES "Specialist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePriceOnSpecialist" ADD CONSTRAINT "public_ServicePriceOnSpecialist_vehicleSize_fkey" FOREIGN KEY ("vehicleSize") REFERENCES "VehicleSize"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleBrand" ADD CONSTRAINT "VehicleBrand_type_fkey" FOREIGN KEY ("type") REFERENCES "VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleModel" ADD CONSTRAINT "VehicleModel_brand_fkey" FOREIGN KEY ("brand") REFERENCES "VehicleBrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleModel" ADD CONSTRAINT "VehicleModel_vehicleSize_fkey" FOREIGN KEY ("vehicleSize") REFERENCES "VehicleSize"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_specialist_fkey" FOREIGN KEY ("specialist") REFERENCES "Specialist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaldoSpecialist" ADD CONSTRAINT "SaldoSpecialist_specialist_fkey" FOREIGN KEY ("specialist") REFERENCES "Specialist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaldoSpecialist" ADD CONSTRAINT "SaldoSpecialist_transaction_fkey" FOREIGN KEY ("transaction") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
