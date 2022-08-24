import { db } from 'api/src/lib/db'

export const createClub = async () =>
  db.club.create({
    data: {
      name: 'Zob',
    },
  })
