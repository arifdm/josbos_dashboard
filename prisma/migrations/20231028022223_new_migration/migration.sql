-- CreateEnum
CREATE TYPE "enum_admins_role" AS ENUM ('super admin', 'accounting', 'admin');

-- CreateEnum
CREATE TYPE "enum_status" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "enum_promo_type" AS ENUM ('amount', 'percent');

-- CreateEnum
CREATE TYPE "enum_size" AS ENUM ('small', 'middle', 'big');

-- CreateEnum
CREATE TYPE "enum_specialists_status" AS ENUM ('online', 'offline', 'banned', 'pending');

-- CreateEnum
CREATE TYPE "enum_transactions_status" AS ENUM ('pending', 'taken', 'unpaid', 'paid', 'ontheway', 'process', 'completed', 'canceled');

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
    "email" VARCHAR(100) NOT NULL,
    "name" VARCHAR(50),
    "phone" VARCHAR(20),
    "address" VARCHAR(100),
    "city" VARCHAR(50),
    "ktp" VARCHAR(20),
    "photo" TEXT,
    "otp" VARCHAR(10),
    "tokenFCM" VARCHAR(255),
    "status" "enum_status" DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

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
    "latitude" VARCHAR(255),
    "longitude" VARCHAR(255),
    "amount" INTEGER,
    "discount" INTEGER,
    "total" INTEGER,
    "note" TEXT,
    "serviceDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "promo" TEXT,
    "user" TEXT,
    "servicePrice" TEXT,
    "serviceSpecialist" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
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
    "name" VARCHAR(255),
    "description" TEXT,
    "icon" VARCHAR(255),
    "status" BOOLEAN DEFAULT true,
    "orderMethod" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specialist" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "address" TEXT,
    "latitude" VARCHAR(255),
    "longitude" VARCHAR(255),
    "phone" VARCHAR(255),
    "photo" TEXT,
    "balances" INTEGER,
    "status" "enum_specialists_status" DEFAULT 'offline',
    "rating" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "city" TEXT,

    CONSTRAINT "Specialist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicePricing" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "price" INTEGER,
    "service" TEXT,
    "city" TEXT NOT NULL,

    CONSTRAINT "ServicePricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceSpecialist" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "price" INTEGER,
    "service" TEXT,
    "specialist" TEXT,
    "city" TEXT NOT NULL,

    CONSTRAINT "ServiceSpecialist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleSize" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "size" "enum_size" DEFAULT 'middle',
    "vehicleModel" TEXT,
    "serviceSpecialist" TEXT,
    "servicePricing" TEXT,

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
    "type" TEXT,

    CONSTRAINT "VehicleBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleModel" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "brand" TEXT,

    CONSTRAINT "VehicleModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_phone_key" ON "Admin"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_promo_fkey" FOREIGN KEY ("promo") REFERENCES "Promo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_servicePrice_fkey" FOREIGN KEY ("servicePrice") REFERENCES "ServicePricing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_serviceSpecialist_fkey" FOREIGN KEY ("serviceSpecialist") REFERENCES "ServiceSpecialist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Specialist" ADD CONSTRAINT "Specialist_city_fkey" FOREIGN KEY ("city") REFERENCES "Cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePricing" ADD CONSTRAINT "ServicePricing_service_fkey" FOREIGN KEY ("service") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePricing" ADD CONSTRAINT "ServicePricing_city_fkey" FOREIGN KEY ("city") REFERENCES "Cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceSpecialist" ADD CONSTRAINT "ServiceSpecialist_service_fkey" FOREIGN KEY ("service") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceSpecialist" ADD CONSTRAINT "ServiceSpecialist_specialist_fkey" FOREIGN KEY ("specialist") REFERENCES "Specialist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceSpecialist" ADD CONSTRAINT "ServiceSpecialist_city_fkey" FOREIGN KEY ("city") REFERENCES "Cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleSize" ADD CONSTRAINT "VehicleSize_vehicleModel_fkey" FOREIGN KEY ("vehicleModel") REFERENCES "VehicleModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleSize" ADD CONSTRAINT "VehicleSize_serviceSpecialist_fkey" FOREIGN KEY ("serviceSpecialist") REFERENCES "ServiceSpecialist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleSize" ADD CONSTRAINT "VehicleSize_servicePricing_fkey" FOREIGN KEY ("servicePricing") REFERENCES "ServicePricing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleBrand" ADD CONSTRAINT "VehicleBrand_type_fkey" FOREIGN KEY ("type") REFERENCES "VehicleType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleModel" ADD CONSTRAINT "VehicleModel_brand_fkey" FOREIGN KEY ("brand") REFERENCES "VehicleBrand"("id") ON DELETE SET NULL ON UPDATE CASCADE;