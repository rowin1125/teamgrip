-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('TRAINING', 'GAME');

-- CreateTable
CREATE TABLE "ActivityPresence" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activityType" "ActivityType" NOT NULL,
    "playerId" TEXT NOT NULL,
    "present" BOOLEAN NOT NULL DEFAULT false,
    "seasonId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "trainingId" TEXT,
    "gameId" TEXT,

    CONSTRAINT "ActivityPresence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ActivityPresence" ADD CONSTRAINT "ActivityPresence_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityPresence" ADD CONSTRAINT "ActivityPresence_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityPresence" ADD CONSTRAINT "ActivityPresence_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityPresence" ADD CONSTRAINT "ActivityPresence_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityPresence" ADD CONSTRAINT "ActivityPresence_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
