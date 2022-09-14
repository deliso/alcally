-- CreateEnum
CREATE TYPE "Type" AS ENUM ('SA', 'SL');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ACCOUNTS', 'BOOKS', 'APPOINTMENT');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "Body" AS ENUM ('BOD', 'J_D', 'J_S_D', 'S_D', 'SH', 'S_SH', 'AU');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CHAIRMAN', 'DIRECTOR', 'SECRETARY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "photoUrl" TEXT,
    "emailVerified" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "audit" BOOLEAN NOT NULL,
    "year_end_day" INTEGER NOT NULL,
    "year_end_month" INTEGER NOT NULL,
    "nif" TEXT NOT NULL,
    "cnae" INTEGER NOT NULL,
    "sole" BOOLEAN NOT NULL,
    "mgmt" "Body" NOT NULL,
    "mgmt_rem" BOOLEAN NOT NULL,
    "mgmt_num" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "due_year" INTEGER NOT NULL,
    "due_month" INTEGER NOT NULL,
    "due_day" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "category" "Category" NOT NULL,
    "frequency" "Frequency" NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Director" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "body" "Body" NOT NULL,
    "active" BOOLEAN NOT NULL,
    "companyId" TEXT NOT NULL,
    "appointment_year" INTEGER NOT NULL,
    "appointment_month" INTEGER NOT NULL,
    "appointment_day" INTEGER NOT NULL,
    "expiry_year" INTEGER NOT NULL,
    "expiry_month" INTEGER NOT NULL,
    "expiry_day" INTEGER NOT NULL,
    "nif" TEXT NOT NULL,
    "dir_rem" BOOLEAN NOT NULL,
    "dir_indef" BOOLEAN NOT NULL,

    CONSTRAINT "Director_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_nif_key" ON "Company"("nif");

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Director_nif_key" ON "Director"("nif");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Director" ADD CONSTRAINT "Director_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
