/*
  Warnings:

  - The primary key for the `Action` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Action` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Action" DROP CONSTRAINT "Action_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "Action_id_key" ON "Action"("id");
