import { Router, Route, Set, Private } from '@redwoodjs/router'

import ClubsLayout from 'src/layouts/ClubsLayout'

import AppLayout from './layouts/AppLayout/AppLayout'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import GeneralLayout from './layouts/GeneralLayout/GeneralLayout'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="home" roles={['ADMIN']}>
        <Set wrap={ClubsLayout}>
          <Route path="/app/admin/clubs/new" page={ClubNewClubPage} name="adminNewClub" />
          <Route path="/app/admin/clubs/{id}/edit" page={ClubEditClubPage} name="adminEditClub" />
          <Route path="/app/admin/clubs/{id}" page={ClubClubPage} name="adminClub" />
          <Route path="/app/admin/clubs" page={ClubClubsPage} name="adminClubs" />
        </Set>
      </Private>
      {/* APP */}
      <Private unauthenticated="login">
        <Set wrap={AppLayout}>
          <Route path="/app" page={AppPage} name="app" />
          <Route path="/app/team" page={TeamTeamPage} name="team" />
          <Route path="/app/club" page={ClubPage} name="club" />
          <Route path="/app/team/nieuw" page={TeamNewTeamPage} name="newTeam" />
          <Route path="/app/instellingen" page={SettingsPage} name="settings" />
          <Route path="/app/instellingen/update-avatar" page={UpdateAvatarPage} name="updateAvatar" />
          <Route path="/app/instellingen/update-user" page={UpdateUserPage} name="updateUser" />
        </Set>
      </Private>
      {/* AUTH */}
      <Set wrap={AuthLayout}>
        <Route path="/app/team/join" page={TeamJoinTeamPage} name="joinTeam" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/aanmelden" page={SignupPage} name="signup" />
        <Route path="/wachtwoord-vergeten" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/wachtwoord-resetten" page={ResetPasswordPage} name="resetPassword" />
        <Route path="/activeren" page={ActivatePage} name="activate" />
      </Set>
      {/* PAGES */}
      <Set wrap={GeneralLayout}>
        <Route path="/over" page={AboutPage} name="about" />
        <Route path="/" page={HomePage} name="home" />
        <Route path="/contact" page={ContactPage} name="contact" />
      </Set>

      {/* Cannot be nested inside a SET*/}
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
