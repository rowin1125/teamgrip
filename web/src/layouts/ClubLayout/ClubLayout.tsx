import { Link, routes } from '@redwoodjs/router'

type ClubLayoutProps = {
  children?: React.ReactNode
}

const ClubLayout = ({ children }: ClubLayoutProps) => {
  return (
    <>
      <header>
        <h1>
          <Link to={routes.home()}>TeamStats club</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to={routes.home()}>Home</Link>
            </li>
            <li>
              <Link to={routes.about()}>About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default ClubLayout
