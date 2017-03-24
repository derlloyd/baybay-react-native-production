import { Dimensions, Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

// where remote files are uploaded online
const url = 'https://baybay.co';

// root localstorage on device
const directory = RNFetchBlob.fs.dirs;

// device dimensions
const { width, height } = Dimensions.get('window');

// export paths to folders where files are stored
const Config = {
    baybayWebsite: url,
    localChallenges: `${directory.DocumentDir}/baybay/challenges/`,         // for baby mp3 clips
    localChallengesLong: `${directory.DocumentDir}/baybay/challengesLong/`, // for long mp3s
    localGamesounds: `${directory.DocumentDir}/baybay/gamesounds/`, // intro, win, fail ... permanent
    remoteChallenges: `${url}/assets/sounds/challenges/`,
    remoteGamesounds: `${url}/assets/sounds/gamesounds/`,
    initialShortsounds: [
        { challengeId: 'a100', shortUrl: "James Brown - I Got the Feelin' BABY.mp3" },
        { challengeId: 'a101', shortUrl: 'Drake - one dance BABY.mp3' },
        { challengeId: 'a102', shortUrl: 'Calvin Harris & Rihanna - This Is What You Came For BABY.mp3' },
        { challengeId: 'a103', shortUrl: 'Adele - Rolling In The Deep baby.mp3' },
        { challengeId: 'a104', shortUrl: 'George Michael - Faith BABY.mp3' },
    ],
    // https://material.io/guidelines/style/color.html#color-color-palette
    colorPrimary: '#2196F3',    // Blue 500
    colorPrimary50: '#E3F2FD',    
    colorPrimary100: '#BBDEFB',    
    colorPrimary200: '#90CAF9',    
    colorPrimary300: '#64B5F6',    
    colorPrimary700: '#1976D2',    
    colorPrimary800: '#1565C0',    
    colorPrimary900: '#0D47A1',    
    colorAccent50: '#FFF8E1',     // Amber
    colorAccent100: '#FFECB3',     // Amber
    colorAccent200: '#FFE082',
    colorAccent300: '#FFD54F',
    colorAccent500: '#FFC107',
    colorAccent700: '#FFA000',
    colorAccent900: '#FF6F00',
    colorWrongBg: 'grey',
    coinIconName: 'star-o',    // from fontawesome     star-o   star-half-o    diamond
    coinIconNameSolid: 'star',
    fontMain: 'RifficFree-Bold',        // alt KomikaAxis
    deviceWidth: width,
    deviceHeight: height,
    bannerHeight: 50,    // admob: width 320, height standard is 50, large 100
    babyfaceDimension: width / 1.5,
    babyfaceDimensionSettings: width / 1.5 * 0.7,
    accessories: [
        { name: 'greeneyes', desc: 'Green Eyes', cost: 750, image: require('./assets/images/greeneyes.png') },
        { name: 'blueeyes', desc: 'Blue Eyes', cost: 750, image: require('./assets/images/blueeyes.png') },
        { name: 'aviator', desc: 'Sunglasses', cost: 1200, image: require('./assets/images/sunglassesaviator.png') },
        { name: 'rainbow', desc: 'Sunglasses', cost: 1200, image: require('./assets/images/sunglassesrainbow.png') },
        { name: 'headphones', desc: 'Headphones', cost: 1500, image: require('./assets/images/phones.png') },
        { name: 'fedora', desc: 'Fedora', cost: 1750, image: require('./assets/images/hat.png') },
    ],
    initialCoins: 1000,
    purchaseOptionCost: 100,
    challengeReward: 200,
    headerHeight: height / 9,
    statusBarPadding: Platform.OS === 'ios' ? 20 : 0,   // space on top of headers for status bar
};

export default Config;

/*
** levels of storage **

// path to device data
// file:///Users/dereklloyd/Library/Developer/CoreSimulator/Devices/81C10E70-AD5A-4937-B5E3-4BBC8B093C79/data/Containers/Data/Application/4E43317C-90AF-4ED4-8016-DAD891CF7215/Documents/RCTAsyncLocalStorage_V1/manifest.json


https://github.com/s-yadav/react-number-format

firebase
    user/challenges
    user/progress
    user/levels

redux state
    auth: AuthReducer,
    allCategories: CategoryReducer,
    selected: SelectionReducer,
    allChallenges: ChallengesReducer,
    currentChallenge: ChallengeReducer,

async localstorage   ---- strings so that challengeGrid can render properly
    challengeId: true or false

blob localstorage    ---- these are mp3 or image files stored locally to make app load faster
    baybay/challenges
    baybay/gamesounds
    baybay/images

local macbook air keyhash
ga0RGNYHvNM5d0SLGQfpQWAPGJ8=

android dev keyhash
dUgWYOkRzglo33e+oayZq9VI6cE=

*/


