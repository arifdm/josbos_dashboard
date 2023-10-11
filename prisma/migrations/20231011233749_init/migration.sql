-- CreateEnum
CREATE TYPE "enum_admins_role" AS ENUM ('super admin', 'accounting', 'admin');

-- CreateEnum
CREATE TYPE "enum_status" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "enum_participants_status" AS ENUM ('book', 'payment', 'completed', 'cancel');

-- CreateEnum
CREATE TYPE "enum_presence" AS ENUM ('anytime', 'called');

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
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "image" VARCHAR(255),
    "lat" VARCHAR(20) NOT NULL,
    "long" VARCHAR(20) NOT NULL,
    "address" TEXT,
    "price" INTEGER DEFAULT 0,
    "maxParticipant" INTEGER DEFAULT 0,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "presenceMethod" "enum_presence" DEFAULT 'anytime',
    "openTime" TIMESTAMP(3),
    "closeTime" TIMESTAMP(3),
    "status" "enum_status" NOT NULL DEFAULT 'inactive',
    "rating" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    "eventsId" TEXT NOT NULL,
    "status" "enum_participants_status" DEFAULT 'book',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_phone_key" ON "Admin"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_eventsId_fkey" FOREIGN KEY ("eventsId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
