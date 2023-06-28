-- CreateTable
CREATE TABLE "_HistoryPlayers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PlayerToSeason" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HistoryPlayers_AB_unique" ON "_HistoryPlayers"("A", "B");

-- CreateIndex
CREATE INDEX "_HistoryPlayers_B_index" ON "_HistoryPlayers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerToSeason_AB_unique" ON "_PlayerToSeason"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerToSeason_B_index" ON "_PlayerToSeason"("B");

-- AddForeignKey
ALTER TABLE "_HistoryPlayers" ADD CONSTRAINT "_HistoryPlayers_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HistoryPlayers" ADD CONSTRAINT "_HistoryPlayers_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToSeason" ADD CONSTRAINT "_PlayerToSeason_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToSeason" ADD CONSTRAINT "_PlayerToSeason_B_fkey" FOREIGN KEY ("B") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;
