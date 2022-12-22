import { Router, Route, Set, Private } from '@redwoodjs/router';

import ClubsLayout from 'src/layouts/ClubsLayout';

import AppLayout from './layouts/AppLayout/AppLayout';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import PageLayout from './layouts/PagesLayout/PagesLayout';

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
          <Route path="/app/club" page={ClubPage} name="club" />
          {/* TEAM */}
          <Route path="/app/team" page={TeamTeamPage} name="team" />
          <Route path="/app/team/nieuw" page={TeamNewTeamPage} name="newTeam" />
          <Route path="/app/team/{id}/update-team" page={TeamUpdateTeamPage} name="updateTeam" />
          <Route path="/app/team/team-settings" page={TeamTeamSettingsPage} name="teamSettings" />
          {/* SEASONS */}
          <Route path="/app/team/{id}/season/nieuw" page={SeasonNewSeasonPage} name="newSeason" />
          <Route path="/app/team/update-season" page={SeasonUpdateSeasonPage} name="updateSeason" />
          {/* TRAININGS */}
          <Route path="/app/team/training/new-training" page={TrainingNewTrainingPage} name="newTraining" />
          <Route path="/app/team/training/{id}" page={TrainingTrainingDetailPage} name="trainingDetail" />
          <Route path="/app/team/training/{id}/update-training" page={TrainingUpdateTrainingPage} name="updateTraining" />
          {/* GAMES */}
          <Route path="/app/team/game/new-game" page={GameNewGamePage} name="newGame" />
          <Route path="/app/team/game/{id}" page={GameGameDetailPage} name="gameDetail" />
          <Route path="/app/team/game/{id}/update-game" page={GameUpdateGamePage} name="updateGame" />
          {/* INSTELLINGEN */}
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
      <Set wrap={PageLayout}>
        <Route path="/" page={HomePage} name="home" prerender />
        <Route path="/over" page={AboutPage} name="about" />
      </Set>

      {/* Cannot be nested inside a SET*/}
      <Route notfound page={NotFoundPage} />
    </Router>
  );
};

export default Routes;
