import { createClub } from './models/Club'
import { createUsersAndConnectToTeam } from './models/Team'
import { createUsers } from './models/User'

export default async () => {
  try {
    console.log(
      "\nRunning seeder in './scripts/seed.{js,ts}'\nMake sure to keep this up to date 🤠\n"
    )

    // ClUB SEED
    await createClub()
    // USER SEEDING
    await createUsers()
    // CREATE USER/PLAYER AND ASSIGN TO TEAM
    await createUsersAndConnectToTeam()
    console.log('Seeded successfully! 👨‍👩‍👦‍👦')
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
