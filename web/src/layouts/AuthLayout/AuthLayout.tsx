import Hero from 'src/components/Hero/Hero'

type AuthLayoutProps = {
  children?: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <Hero type="football-night-man" size="lg" />
      {children}
    </>
  )
}

export default AuthLayout
