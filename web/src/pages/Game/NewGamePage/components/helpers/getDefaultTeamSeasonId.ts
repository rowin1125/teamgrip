export const getDefaultTeamSeasonId = (team) =>
  team?.season.filter((season) =>
    season.name.includes(new Date().getFullYear().toString())
  )?.[0].id
