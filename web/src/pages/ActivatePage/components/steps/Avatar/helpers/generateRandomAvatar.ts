const topTypeMap = {
    NoHair: 'Kaal',
    Eyepatch: 'Piraten lapje',
    Hat: 'Hoed',
    Hijab: 'Hijab',
    Turban: 'Turban',
    WinterHat1: 'Winter hoed 1',
    WinterHat2: 'Winter hoed 2',
    WinterHat3: 'Winter hoed 3',
    WinterHat4: 'Winter hoed 4',
    LongHairBigHair: 'Lang (krullen)',
    LongHairBob: 'Lang haar (mid)',
    LongHairBun: 'Knotje',
    LongHairCurly: 'Lang haar (krullen 2)',
    LongHairCurvy: 'Lang haar (krullen 3)',
    LongHairDreads: 'Lang haar (dreads)',
    LongHairFrida: 'Lang haar (hippie)',
    LongHairFro: 'Afro',
    LongHairFroBand: 'Afro (band)',
    LongHairNotTooLong: 'Middel lang',
    LongHairShavedSides: 'Lang haar (geschoren)',
    LongHairMiaWallace: 'Lang haar (bloempot)',
    LongHairStraight: 'Lang haar (stijl)',
    LongHairStraight2: 'Lang haar (stijl 2)',
    LongHairStraightStrand: 'Lang haar (stijl 3)',
    ShortHairDreads01: 'Dreadlocks 1',
    ShortHairDreads02: 'Dreadlocks 2',
    ShortHairFrizzle: 'Kuif',
    ShortHairShaggyMullet: 'Retro',
    ShortHairShaggy: '',
    ShortHairShortCurly: 'Korte krullen',
    ShortHairShortRound: 'Kort plat',
    ShortHairShortFlat: 'Kort kuifje',
    ShortHairShortWaved: 'Kort kuifje 2',
    ShortHairSides: 'Monnik',
    ShortHairTheCaesar: 'Millitiair',
    ShortHairTheCaesarSidePart: 'Millitiair (met streep)',
};
const accessoriesTypeMap = {
    Blank: 'Geen',
    Kurt: 'Kurt',
    Prescription01: 'Bril 1',
    Prescription02: 'Bril 2',
    Round: 'Ronde bril',
    Sunglasses: 'Zonnebril',
    Wayfarers: 'Wayfarers',
};
const hatColorMap = {
    Black: 'Zwart',
    Blue01: 'Blauw 1',
    Blue02: 'Blauw 2',
    Blue03: 'Blauw 3',
    Gray01: 'Grijs 1',
    Gray02: 'Grijs 2',
    Heather: 'Heather',
    PastelBlue: 'Pastel blauw',
    PastelGreen: 'Pastel groen',
    PastelOrange: 'Pastel oranje',
    PastelRed: 'Pastel rood',
    PastelYellow: 'Pastel geel',
    Pink: 'Roze',
    Red: 'Rood',
    White: 'Wit',
};
const hairColorMap = {
    Auburn: 'Auburn',
    Black: 'Zwart',
    Blonde: 'Blond',
    BlondeGolden: 'Blond goud',
    Brown: 'Bruin',
    BrownDark: 'Bruin donker',
    PastelPink: 'Pastel roze',
    Platinum: 'Platinum',
    Red: 'Rood',
    SilverGray: 'Zilver grijs',
};
const facialHairTypeMap = {
    Blank: 'Geen',
    BeardMedium: 'Baard (middel)',
    BeardLight: 'Baard (licht)',
    BeardMagestic: 'Baard (rond&lang)',
    MoustacheFancy: 'Snor (fancy)',
    MoustacheMagnum: 'Snor (magnum)',
};
const facialHairColorMap = {
    Auburn: 'Auburn',
    Black: 'Zwart',
    Blonde: 'Blond',
    BlondeGolden: 'Blond goud',
    Brown: 'Bruin',
    BrownDark: 'Bruin donker',
    PastelPink: 'Pastel roze',
    Platinum: 'Platinum',
    Red: 'Rood',
};
const clotheTypeMap = {
    BlazerShirt: 'Blazer (overhemd)',
    BlazerSweater: 'Blazer (trui)',
    CollarSweater: 'Trui (met kraag)',
    GraphicShirt: 'T-shirt',
    Hoodie: 'Hoodie',
    Overall: 'Overall',
    ShirtCrewNeck: 'T-shirt (ronde hals)',
    ShirtScoopNeck: 'T-shirt (lage ronde hals)',
    ShirtVNeck: 'T-shirt (V-hals)',
};
const clotheColorMap = {
    Black: 'Zwart',
    Blue01: 'Blauw 1',
    Blue02: 'Blauw 2',
    Blue03: 'Blauw 3',
    Gray01: 'Grijs 1',
    Gray02: 'Grijs 2',
    Heather: 'Heather',
    PastelBlue: 'Pastel blauw',
    PastelGreen: 'Pastel groen',
    PastelOrange: 'Pastel oranje',
    PastelRed: 'Pastel rood',
    PastelYellow: 'Pastel geel',
    Pink: 'Roze',
    Red: 'Rood',
    White: 'Wit',
};
const graphicType = {
    Bat: 'Vleermuis',
    Cumbia: 'Cumbia',
    Deer: 'Hert',
    Diamond: 'Diamant',
    Hola: 'Hola',
    Pizza: 'Pizza',
    Resist: 'Resist',
    Selena: 'Selena',
    Bear: 'Beer',
    SkullOutline: 'Schedel (uitlijning)',
    Skull: 'Schedel',
};
const eyeTypeMap = {
    Close: 'Dicht',
    Cry: 'Huilen',
    Default: 'Standaard',
    Dizzy: 'Duizelig',
    EyeRoll: 'Ogen rollen',
    Happy: 'Blij',
    Hearts: 'Harten',
    Side: 'Zijwaarts',
    Squint: 'Knipperen',
    Surprised: 'Verbaasd',
    Wink: 'Knipoog',
    WinkWacky: 'Knipoog (wacky)',
};
const eyebrowTypeMap = {
    Angry: 'Boos',
    AngryNatural: 'Boos (natuurlijk)',
    Default: 'Standaard',
    DefaultNatural: 'Standaard (natuurlijk)',
    FlatNatural: 'Plat (natuurlijk)',
    RaisedExcited: 'Opgetrokken (opgewonden)',
    RaisedExcitedNatural: 'Opgetrokken (opgewonden, natuurlijk)',
    SadConcerned: 'Bedroefd',
    SadConcernedNatural: 'Bedroefd (natuurlijk)',
    UnibrowNatural: 'Unibrow (natuurlijk)',
    UpDown: 'Omhoog/omlaag',
    UpDownNatural: 'Omhoog/omlaag (natuurlijk)',
};
const mouthTypeMap = {
    Concerned: 'Bezorgd',
    Default: 'Standaard',
    Disbelief: 'Ongeloof',
    Eating: 'Eten',
    Grimace: 'Grimas',
    Sad: 'Bedroefd',
    ScreamOpen: 'Scream open',
    Serious: 'Serious',
    Smile: 'Lachen',
    Tongue: 'Tong',
    Twinkle: 'Twinkle',
    Vomit: 'Overgeven',
};
const skinColorMap = {
    Tanned: 'Getint',
    Yellow: 'Geel',
    Pale: 'Wit',
    Light: 'Licht',
    Brown: 'Bruin',
    DarkBrown: 'Donker bruin',
    Black: 'Donker',
};

export const avatarOptions = {
    topType: topTypeMap,
    accessoriesType: accessoriesTypeMap,
    hatColor: hatColorMap,
    hairColor: hairColorMap,
    facialHairType: facialHairTypeMap,
    facialHairColor: facialHairColorMap,
    clotheType: clotheTypeMap,
    clotheColor: clotheColorMap,
    graphicType: graphicType,
    eyeType: eyeTypeMap,
    eyebrowType: eyebrowTypeMap,
    mouthType: mouthTypeMap,
    skinColor: skinColorMap,
};

type ConfigsKeys = keyof typeof avatarOptions;

const configsKeys = Object.keys(avatarOptions) as ConfigsKeys[];

export function generateRandomAvatarOptions() {
    const options = {} as Record<ConfigsKeys, string>;
    const keys = [...configsKeys];
    keys.forEach((key) => {
        const configArray = Object.keys(avatarOptions[key]);
        options[key] =
            configArray[Math.floor(Math.random() * configArray.length)];
    });

    return options;
}
