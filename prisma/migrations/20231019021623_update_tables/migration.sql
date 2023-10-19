-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL,
    "user" TEXT,
    "vehicle" TEXT,
    "city" TEXT,
    "address" TEXT,
    "latitude" VARCHAR(255),
    "longitude" VARCHAR(255),
    "promo" TEXT,
    "amount" INTEGER,
    "discount" INTEGER,
    "total" INTEGER,
    "note" TEXT,
    "serviceDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleBrands" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "type" TEXT,
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleBrands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleModels" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "brand" TEXT,
    "type" TEXT,
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleModels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleTypes" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicles" (
    "id" TEXT NOT NULL,
    "type" TEXT,
    "brand" TEXT,
    "model" TEXT,
    "cilinder" TEXT,
    "plate" VARCHAR(255),
    "user" TEXT,
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_vehicle_fkey" FOREIGN KEY ("vehicle") REFERENCES "Vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleBrands" ADD CONSTRAINT "VehicleBrands_type_fkey" FOREIGN KEY ("type") REFERENCES "VehicleTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleModels" ADD CONSTRAINT "VehicleModels_brand_fkey" FOREIGN KEY ("brand") REFERENCES "VehicleBrands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleModels" ADD CONSTRAINT "VehicleModels_type_fkey" FOREIGN KEY ("type") REFERENCES "VehicleTypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicles" ADD CONSTRAINT "Vehicles_brand_fkey" FOREIGN KEY ("brand") REFERENCES "VehicleBrands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicles" ADD CONSTRAINT "Vehicles_model_fkey" FOREIGN KEY ("model") REFERENCES "VehicleModels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
