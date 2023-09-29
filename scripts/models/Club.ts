import { db } from 'api/src/lib/db';

export const createClub = async () => {
    try {
        const club = await db.club.create({
            data: {
                name: 'Zob',
            },
        });

        return club;
    } catch (error) {
        console.error(error);
    }
};
