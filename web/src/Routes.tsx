import { Router, Route, Set, Private } from '@redwoodjs/router'

import AppLayout from './layouts/AppLayout/AppLayout'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import GeneralLayout from './layouts/GeneralLayout/GeneralLayout'

const Routes = () => {
  return (
    <Router>
      {/* APP */}
      <Private unauthenticated="login">
        <Set wrap={AppLayout}>
          <Route path="/app" page={AppPage} name="app" />
          <Route path="/app/instellingen" page={SettingsPage} name="settings" />
          <Route path="/app/instellingen/update-avatar" page={UpdateAvatarPage} name="updateAvatar" />
        </Set>
      </Private>
      {/* AUTH */}
      <Set wrap={AuthLayout}>
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
