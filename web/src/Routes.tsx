import { Router, Route, Set } from '@redwoodjs/router'
import ClubLayout from './layouts/ClubLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ClubLayout}>
        <Route path="/about" page={AboutPage} name="about" />
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
