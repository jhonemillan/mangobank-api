/*
  Warnings:

  - You are about to drop the column `referredEmail` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_referredEmail_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "referredEmail",
ADD COLUMN     "referralEmail" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referralEmail_fkey" FOREIGN KEY ("referralEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
