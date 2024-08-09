/*
  Warnings:

  - The primary key for the `Job` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Job` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - The required column `jobId` was added to the `Job` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Job" DROP CONSTRAINT "Job_pkey",
DROP COLUMN "id",
ADD COLUMN     "jobId" TEXT NOT NULL,
ADD CONSTRAINT "Job_pkey" PRIMARY KEY ("jobId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "Company" (
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("companyId")
);
