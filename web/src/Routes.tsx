import { Router, Route, Set, Private } from '@redwoodjs/router'

import TeamsLayout from 'src/layouts/TeamsLayout'
import ClubLayout from './layouts/ClubLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Private unauthenticated="home" roles={['ADMIN']}>
        <Set wrap={TeamsLayout}>
          <Route path="/admin/teams/new" page={TeamNewTeamPage} name="newTeam" />
          <Route path="/admin/teams/{id}/edit" page={TeamEditTeamPage} name="editTeam" />
          <Route path="/admin/teams/{id}" page={TeamTeamPage} name="team" />
          <Route path="/admin/teams" page={TeamTeamsPage} name="teams" />
        </Set>
      </Private>
      <Set wrap={ClubLayout}>
        <Route path="/contact" page={ContactPage} name="contact" />
        <Route path="/club-team/{id}" page={ClubTeamPage} name="clubTeam" />
        <Route path="/about" page={AboutPage} name="about" />
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
