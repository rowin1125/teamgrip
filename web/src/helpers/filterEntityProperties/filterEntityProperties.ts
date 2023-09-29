export const filterEntityProperties = <
    T extends Record<string, unknown>,
    K extends keyof T
>(
    entityArray: T[] | undefined,
    keys: K[]
) => {
    if (!entityArray) return [];

    return entityArray.map((entity) => {
        const entityKeys = Object.keys(entity);
        const matchingKeys = entityKeys.filter((key) =>
            keys.includes(key as K)
        );

        const filteredEntity = {} as Pick<T, K>;

        for (const key of matchingKeys as K[]) {
            filteredEntity[key] = entity[key];
        }
        return filteredEntity;
    });
};
