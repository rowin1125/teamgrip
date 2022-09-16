-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_seasonId_fkey";

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
