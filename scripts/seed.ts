import { createUsers } from './models/User'

export default async () => {
  try {
    console.log(
      "\nRunning seeder in './scripts/seed.{js,ts}'\nMake sure to keep this up to date 🤠\n"
    )

    // USER SEEDING
    await createUsers()
    console.log('Seeded successfully! 👨‍👩‍👦‍👦')
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
