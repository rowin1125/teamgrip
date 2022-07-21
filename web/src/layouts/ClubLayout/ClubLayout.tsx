import { Button } from '@chakra-ui/react'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

type ClubLayoutProps = {
  children?: React.ReactNode
}

const ClubLayout = ({ children }: ClubLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <header>
        <div className="flex-between">
          <h1>
            <Link to={routes.home()}>TeamStats club</Link>
          </h1>
          {isAuthenticated ? (
            <div>
              <span>Logged in as: {currentUser.email}</span>{' '}
              <Button type="button" onClick={logOut}>
                Logout
              </Button>
            </div>
          ) : (
            <Link to={routes.login()}>Login</Link>
          )}
        </div>
        <nav>
          <ul>
            <li>
              <Link to={routes.home()}>Home</Link>
            </li>
            <li>
              <Link to={routes.about()}>About</Link>
            </li>
            <li>
              <Link to={routes.contact()}>Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default ClubLayout
