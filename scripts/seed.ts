import { createClub } from './models/Club';
import { createScores } from './models/Scores';
import { createSeason } from './models/Season';
import { createUsersAndConnectToTeam } from './models/Team';
import { createUsers } from './models/User';

export const waitFor = (ms: number, message?: string) =>
    new Promise((resolve) => {
        if (message) console.log(message);
        setTimeout(resolve, ms);
    });

export default async () => {
    try {
        console.log(
            "\nRunning seeder in './scripts/seed.{js,ts}'\nMake sure to keep this up to date 🤠\n"
        );

        await createClub();
        await createUsers();
        await createUsersAndConnectToTeam();
        const season = await createSeason();
        await createScores(season);

        console.log('Seeded successfully! 👨‍👩‍👦‍👦');
    } catch (error) {
        console.warn('Please define your seed data.');
        console.error(error);
    }
};
