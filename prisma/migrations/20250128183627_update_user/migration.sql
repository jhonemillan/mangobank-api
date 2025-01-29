/*
  Warnings:

  - You are about to drop the column `referredById` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_referredById_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "referredById",
ADD COLUMN     "referredEmail" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referredEmail_fkey" FOREIGN KEY ("referredEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
