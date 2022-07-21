import { Link, routes } from '@redwoodjs/router'

import type { Team } from 'types/graphql'

interface ClubTeamProps {
  team: Team
}

const ClubTeam = ({ team }: ClubTeamProps) => {
  return (
    <div>
      <header>
        <h2>
          <Link to={routes.clubTeam({ id: team.id })}>{team.name}</Link>
        </h2>
      </header>
      <div>Created at: {team.createdAt}</div>
      <div>Updated at: {team.updatedAt}</div>
    </div>
  )
}

export default ClubTeam
