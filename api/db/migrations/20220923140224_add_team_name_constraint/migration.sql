/*
  Warnings:

  - A unique constraint covering the columns `[clubTeamName]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - The required column `clubTeamName` was added to the `Team` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Team_name_key";

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "clubTeamName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Team_clubTeamName_key" ON "Team"("clubTeamName");
