/*
  Warnings:

  - You are about to drop the column `company` on the `Job` table. All the data in the column will be lost.
  - You are about to alter the column `salary` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('REMOTE', 'ONSITE', 'HYBRID');

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "company",
ADD COLUMN     "companyId" TEXT NOT NULL,
DROP COLUMN "location",
ADD COLUMN     "location" "WorkMode" NOT NULL,
ALTER COLUMN "salary" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
