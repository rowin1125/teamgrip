import { db } from 'api/src/lib/db';

export const createSeason = async () => {
    const teamWithRowin = await db.team.findFirst({
        where: {
            owner: {
                email: 'rowinmol648@gmail.com',
            },
        },
    });

    if (!teamWithRowin) throw new Error('Season: No team found');

    const season = await db.season.create({
        data: {
            name: '2021-2022',
            active: true,
            seasonTeamName: 'Zob-zaterdag-1-2021-2022',
            team: {
                connect: {
                    id: teamWithRowin.id,
                },
            },
        },
    });
    return season;
};
