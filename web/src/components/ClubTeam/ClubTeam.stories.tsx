import ClubTeam from './ClubTeam'
import { standard } from '../ClubTeamCell/ClubTeamCell.mock'

export const generated = () => {
  return <ClubTeam team={standard().team} />
}

export default { title: 'Components/ClubTeam' }
