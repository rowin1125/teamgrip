import { Router, Route, Set, Private } from '@redwoodjs/router'

import AuthLayout from './layouts/AuthLayout/AuthLayout'
import GeneralLayout from './layouts/GeneralLayout/GeneralLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={AuthLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route path="/activate" page={ActivatePage} name="activate" />
      </Set>
      <Set wrap={GeneralLayout}>
        <Route path="/about" page={AboutPage} name="about" />
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Set>
      <Private unauthenticated="home">
        <Set wrap={GeneralLayout}>
          <Route path="/contact" page={ContactPage} name="contact" />
        </Set>
      </Private>
    </Router>
  )
}

export default Routes
