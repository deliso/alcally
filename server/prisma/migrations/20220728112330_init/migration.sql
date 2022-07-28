/*
  Warnings:

  - You are about to drop the column `content` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId]` on the table `Action` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_date` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `audit` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year_end` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Company` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('SA', 'SL');

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_userId_fkey";

-- DropIndex
DROP INDEX "Company_userId_key";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "content",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "due_date" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "userId",
ADD COLUMN     "audit" BOOLEAN NOT NULL,
ADD COLUMN     "year_end" INTEGER NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "Type" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Action_companyId_key" ON "Action"("companyId");

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
