-- DropIndex
DROP INDEX "Action_companyId_key";

-- AlterTable
ALTER TABLE "Action" ADD CONSTRAINT "Action_pkey" PRIMARY KEY ("companyId");
