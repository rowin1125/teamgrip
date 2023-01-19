import { Game } from 'types/graphql';

export const getBestGamePlayer = (game: Game) => {
  const combinedPointsForPlayers = game?.scores?.reduce((acc, score) => {
    if (!score?.player.id) return acc;

    acc[score?.player?.id] = acc[score?.player?.id]
      ? acc[score?.player?.id] + score?.points
      : score?.points;

    return acc;
  }, {} as Record<string, number>);
  const orderBasedOnHighestPoints = Object.entries(
    combinedPointsForPlayers || []
  ).sort((a, b) => {
    if (!a[1] || !b[1]) return 0;

    if (a[1] < b[1]) return 1;
    if (a[1] > b[1]) return -1;
    return 0;
  });

  const bestPoints = orderBasedOnHighestPoints[0];
  const bestPlayer = game?.players.find(
    (player) => player?.id === bestPoints?.[0]
  );

  return bestPlayer;
};
