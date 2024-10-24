/*
  Warnings:

  - You are about to drop the column `location` on the `Job` table. All the data in the column will be lost.
  - Added the required column `type` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "location",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "type" "WorkMode" NOT NULL;
