import { MetaTags } from '@redwoodjs/web'
import ClubTeamCell from 'src/components/ClubTeamCell'

interface ClubTeamPageProps {
  id: string
}
const ClubTeamPage = ({ id }: ClubTeamPageProps) => {
  return (
    <>
      <MetaTags title="ClubTeam" description="ClubTeam page" />

      <ClubTeamCell id={id} />
    </>
  )
}

export default ClubTeamPage
