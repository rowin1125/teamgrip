import { Router, Route, Set, Private } from '@redwoodjs/router';

import ClubsLayout from 'src/layouts/ClubsLayout';

import { useAuth } from './auth';
import AppLayout from './layouts/AppLayout/AppLayout';
import AuthLayout from './layouts/AuthLayout/AuthLayout';

const Routes = () => {
    return (
        <Router useAuth={useAuth}>
            <Private unauthenticated="home" roles={['ADMIN']}>
                <Set wrap={ClubsLayout}>
                    <Route path="/admin/clubs/new" page={ClubNewClubPage} name="adminNewClub" />
                    <Route path="/admin/clubs/{id}/edit" page={ClubEditClubPage} name="adminEditClub" />
                    <Route path="/admin/clubs/{id}" page={ClubClubPage} name="adminClub" />
                    <Route path="/admin/clubs" page={ClubClubsPage} name="adminClubs" />
                </Set>
            </Private>
            {/* APP */}
            <Private unauthenticated="login">
                <Set wrap={AppLayout}>
                    <Route path="/" page={AppPage} name="app" />
                    <Route path="/club" page={ClubPage} name="club" />
                    {/* TEAM */}
                    <Route path="/team" page={TeamTeamPage} name="team" />
                    <Route path="/team/nieuw" page={TeamNewTeamPage} name="newTeam" />
                    <Route path="/team/{id}/update-team" page={TeamUpdateTeamPage} name="updateTeam" />
                    <Route path="/team/team-settings" page={TeamTeamSettingsPage} name="teamSettings" />
                    {/* SEASONS */}
                    <Route path="/team/{id}/season/nieuw" page={SeasonNewSeasonPage} name="newSeason" />
                    <Route path="/team/update-season" page={SeasonUpdateSeasonPage} name="updateSeason" />
                    {/* TRAININGS */}
                    <Route path="/team/training/new-training" page={TrainingNewTrainingPage} name="newTraining" />
                    <Route path="/team/training/{id}" page={TrainingTrainingDetailPage} name="trainingDetail" />
                    <Route path="/team/training/{id}/update-training" page={TrainingUpdateTrainingPage} name="updateTraining" />
                    {/* GAMES */}
                    <Route path="/team/game/new-game" page={GameNewGamePage} name="newGame" />
                    <Route path="/team/game/{id}" page={GameGameDetailPage} name="gameDetail" />
                    <Route path="/team/game/{id}/update-game" page={GameUpdateGamePage} name="updateGame" />
                    {/* PLAYERS */}
                    <Route path="/team/speler/{id}" page={PlayerDetailPage} name="playerDetail" />
                    {/* INSTELLINGEN */}
                    <Route path="/instellingen" page={SettingsPage} name="settings" />
                    <Route path="/instellingen/update-avatar" page={UpdateAvatarPage} name="updateAvatar" />
                    <Route path="/instellingen/update-user" page={UpdateUserPage} name="updateUser" />
                </Set>
            </Private>
            {/* AUTH */}
            <Set wrap={AuthLayout}>
                <Route path="/team/join" page={TeamJoinTeamPage} name="joinTeam" />
                <Route path="/login" page={LoginPage} name="login" />
                <Route path="/aanmelden" page={SignupPage} name="signup" />
                <Route path="/wachtwoord-vergeten" page={ForgotPasswordPage} name="forgotPassword" />
                <Route path="/wachtwoord-resetten" page={ResetPasswordPage} name="resetPassword" />
                <Route path="/activeren" page={ActivatePage} name="activate" />
            </Set>
            {/* Cannot be nested inside a SET*/}
            <Route notfound page={NotFoundPage} />
        </Router>
    );
};

export default Routes;
