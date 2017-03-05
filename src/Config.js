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


linear gradient backgrounds
https://github.com/react-native-community/react-native-linear-gradient
      <Components.LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{padding: 15, alignItems: 'center', borderRadius: 5}}>
        <Text style={{backgroundColor: 'transparent', fontSize: 15, color: '#fff'}}>
          Sign in with Facebook
        </Text>
      </Components.LinearGradient>

fonts from xcode
2017-02-27 20:55:35.314 baybay[19628:6767151] Devanagari Sangam MN
2017-02-27 20:55:35.314 baybay[19628:6767151]  DevanagariSangamMN
2017-02-27 20:55:35.314 baybay[19628:6767151]  DevanagariSangamMN-Bold
2017-02-27 20:55:35.315 baybay[19628:6767151] Avenir Next
2017-02-27 20:55:35.315 baybay[19628:6767151]  AvenirNext-UltraLight
2017-02-27 20:55:35.315 baybay[19628:6767151]  AvenirNext-UltraLightItalic
2017-02-27 20:55:35.315 baybay[19628:6767151]  AvenirNext-Bold
2017-02-27 20:55:35.315 baybay[19628:6767151]  AvenirNext-BoldItalic
2017-02-27 20:55:35.316 baybay[19628:6767151]  AvenirNext-DemiBold
2017-02-27 20:55:35.316 baybay[19628:6767151]  AvenirNext-DemiBoldItalic
2017-02-27 20:55:35.316 baybay[19628:6767151]  AvenirNext-Medium
2017-02-27 20:55:35.316 baybay[19628:6767151]  AvenirNext-HeavyItalic
2017-02-27 20:55:35.317 baybay[19628:6767151]  AvenirNext-Heavy
2017-02-27 20:55:35.317 baybay[19628:6767151]  AvenirNext-Italic
2017-02-27 20:55:35.317 baybay[19628:6767151]  AvenirNext-Regular
2017-02-27 20:55:35.317 baybay[19628:6767151]  AvenirNext-MediumItalic
2017-02-27 20:55:35.317 baybay[19628:6767151] Kohinoor Devanagari
2017-02-27 20:55:35.318 baybay[19628:6767151]  KohinoorDevanagari-Light
2017-02-27 20:55:35.318 baybay[19628:6767151]  KohinoorDevanagari-Regular
2017-02-27 20:55:35.318 baybay[19628:6767151]  KohinoorDevanagari-Semibold
2017-02-27 20:55:35.318 baybay[19628:6767151] Times New Roman
2017-02-27 20:55:35.319 baybay[19628:6767151]  TimesNewRomanPSMT
2017-02-27 20:55:35.319 baybay[19628:6767151]  TimesNewRomanPS-BoldItalicMT
2017-02-27 20:55:35.319 baybay[19628:6767151]  TimesNewRomanPS-ItalicMT
2017-02-27 20:55:35.319 baybay[19628:6767151]  TimesNewRomanPS-BoldMT
2017-02-27 20:55:35.320 baybay[19628:6767151] Gill Sans
2017-02-27 20:55:35.320 baybay[19628:6767151]  GillSans-Italic
2017-02-27 20:55:35.320 baybay[19628:6767151]  GillSans-Bold
2017-02-27 20:55:35.320 baybay[19628:6767151]  GillSans-BoldItalic
2017-02-27 20:55:35.321 baybay[19628:6767151]  GillSans-LightItalic
2017-02-27 20:55:35.321 baybay[19628:6767151]  GillSans
2017-02-27 20:55:35.321 baybay[19628:6767151]  GillSans-Light
2017-02-27 20:55:35.321 baybay[19628:6767151]  GillSans-SemiBold
2017-02-27 20:55:35.321 baybay[19628:6767151]  GillSans-SemiBoldItalic
2017-02-27 20:55:35.322 baybay[19628:6767151]  GillSans-UltraBold
2017-02-27 20:55:35.322 baybay[19628:6767151] Kailasa
2017-02-27 20:55:35.322 baybay[19628:6767151]  Kailasa-Bold
2017-02-27 20:55:35.322 baybay[19628:6767151]  Kailasa
2017-02-27 20:55:35.323 baybay[19628:6767151] Bradley Hand
2017-02-27 20:55:35.323 baybay[19628:6767151]  BradleyHandITCTT-Bold
2017-02-27 20:55:35.323 baybay[19628:6767151] PingFang HK
2017-02-27 20:55:35.323 baybay[19628:6767151]  PingFangHK-Ultralight
2017-02-27 20:55:35.324 baybay[19628:6767151]  PingFangHK-Semibold
2017-02-27 20:55:35.324 baybay[19628:6767151]  PingFangHK-Thin
2017-02-27 20:55:35.324 baybay[19628:6767151]  PingFangHK-Light
2017-02-27 20:55:35.324 baybay[19628:6767151]  PingFangHK-Regular
2017-02-27 20:55:35.325 baybay[19628:6767151]  PingFangHK-Medium
2017-02-27 20:55:35.325 baybay[19628:6767151] Savoye LET
2017-02-27 20:55:35.325 baybay[19628:6767151]  SavoyeLetPlain
2017-02-27 20:55:35.325 baybay[19628:6767151] Trebuchet MS
2017-02-27 20:55:35.325 baybay[19628:6767151]  Trebuchet-BoldItalic
2017-02-27 20:55:35.326 baybay[19628:6767151]  TrebuchetMS
2017-02-27 20:55:35.326 baybay[19628:6767151]  TrebuchetMS-Bold
2017-02-27 20:55:35.326 baybay[19628:6767151]  TrebuchetMS-Italic
2017-02-27 20:55:35.326 baybay[19628:6767151] Komika Axis
2017-02-27 20:55:35.327 baybay[19628:6767151]  KomikaAxis
2017-02-27 20:55:35.327 baybay[19628:6767151] Baskerville
2017-02-27 20:55:35.327 baybay[19628:6767151]  Baskerville-Italic
2017-02-27 20:55:35.328 baybay[19628:6767151]  Baskerville-SemiBold
2017-02-27 20:55:35.328 baybay[19628:6767151]  Baskerville-BoldItalic
2017-02-27 20:55:35.328 baybay[19628:6767151]  Baskerville-SemiBoldItalic
2017-02-27 20:55:35.328 baybay[19628:6767151]  Baskerville-Bold
2017-02-27 20:55:35.328 baybay[19628:6767151]  Baskerville
2017-02-27 20:55:35.329 baybay[19628:6767151] Futura
2017-02-27 20:55:35.329 baybay[19628:6767151]  Futura-CondensedMedium
2017-02-27 20:55:35.329 baybay[19628:6767151]  Futura-CondensedExtraBold
2017-02-27 20:55:35.329 baybay[19628:6767151]  Futura-Medium
2017-02-27 20:55:35.330 baybay[19628:6767151]  Futura-MediumItalic
2017-02-27 20:55:35.330 baybay[19628:6767151]  Futura-Bold
2017-02-27 20:55:35.330 baybay[19628:6767151] Arial Hebrew
2017-02-27 20:55:35.330 baybay[19628:6767151]  ArialHebrew-Bold
2017-02-27 20:55:35.331 baybay[19628:6767151]  ArialHebrew-Light
2017-02-27 20:55:35.331 baybay[19628:6767151]  ArialHebrew
2017-02-27 20:55:35.331 baybay[19628:6767151] Ionicons
2017-02-27 20:55:35.331 baybay[19628:6767151]  Ionicons
2017-02-27 20:55:35.331 baybay[19628:6767151] FontAwesome
2017-02-27 20:55:35.332 baybay[19628:6767151]  FontAwesome
2017-02-27 20:55:35.332 baybay[19628:6767151] Material Design Icons
2017-02-27 20:55:35.332 baybay[19628:6767151]  Material-Design-Icons
2017-02-27 20:55:35.332 baybay[19628:6767151] Bodoni 72
2017-02-27 20:55:35.333 baybay[19628:6767151]  BodoniSvtyTwoITCTT-Bold
2017-02-27 20:55:35.333 baybay[19628:6767151]  BodoniSvtyTwoITCTT-Book
2017-02-27 20:55:35.333 baybay[19628:6767151]  BodoniSvtyTwoITCTT-BookIta
2017-02-27 20:55:35.333 baybay[19628:6767151] Hoefler Text
2017-02-27 20:55:35.334 baybay[19628:6767151]  HoeflerText-Italic
2017-02-27 20:55:35.334 baybay[19628:6767151]  HoeflerText-Regular
2017-02-27 20:55:35.334 baybay[19628:6767151]  HoeflerText-Black
2017-02-27 20:55:35.334 baybay[19628:6767151]  HoeflerText-BlackItalic
2017-02-27 20:55:35.334 baybay[19628:6767151] Optima
2017-02-27 20:55:35.335 baybay[19628:6767151]  Optima-Regular
2017-02-27 20:55:35.335 baybay[19628:6767151]  Optima-ExtraBlack
2017-02-27 20:55:35.335 baybay[19628:6767151]  Optima-BoldItalic
2017-02-27 20:55:35.335 baybay[19628:6767151]  Optima-Italic
2017-02-27 20:55:35.336 baybay[19628:6767151]  Optima-Bold

2017-02-27 21:12:22.196 baybay[20115:6775137] Riffic Free               ***************
2017-02-27 21:12:22.197 baybay[20115:6775137]  RifficFree-Bold
2017-02-27 20:55:35.336 baybay[19628:6767151] Heiti TC
2017-02-27 20:55:35.336 baybay[19628:6767151] zocial
2017-02-27 20:55:35.336 baybay[19628:6767151]  zocial
2017-02-27 20:55:35.336 baybay[19628:6767151] Geeza Pro
2017-02-27 20:55:35.337 baybay[19628:6767151]  GeezaPro
2017-02-27 20:55:35.337 baybay[19628:6767151]  GeezaPro-Bold
2017-02-27 20:55:35.337 baybay[19628:6767151] fontcustom
2017-02-27 20:55:35.337 baybay[19628:6767151]  fontcustom
2017-02-27 20:55:35.338 baybay[19628:6767151] Kohinoor Telugu
2017-02-27 20:55:35.338 baybay[19628:6767151]  KohinoorTelugu-Regular
2017-02-27 20:55:35.338 baybay[19628:6767151]  KohinoorTelugu-Medium
2017-02-27 20:55:35.338 baybay[19628:6767151]  KohinoorTelugu-Light
2017-02-27 20:55:35.339 baybay[19628:6767151] Helvetica Neue
2017-02-27 20:55:35.339 baybay[19628:6767151]  HelveticaNeue-Italic
2017-02-27 20:55:35.339 baybay[19628:6767151]  HelveticaNeue-Bold
2017-02-27 20:55:35.339 baybay[19628:6767151]  HelveticaNeue-UltraLight
2017-02-27 20:55:35.340 baybay[19628:6767151]  HelveticaNeue-CondensedBlack
2017-02-27 20:55:35.340 baybay[19628:6767151]  HelveticaNeue-BoldItalic
2017-02-27 20:55:35.340 baybay[19628:6767151]  HelveticaNeue-CondensedBold
2017-02-27 20:55:35.340 baybay[19628:6767151]  HelveticaNeue-Medium
2017-02-27 20:55:35.340 baybay[19628:6767151]  HelveticaNeue-Light
2017-02-27 20:55:35.341 baybay[19628:6767151]  HelveticaNeue-Thin
2017-02-27 20:55:35.341 baybay[19628:6767151]  HelveticaNeue-ThinItalic
2017-02-27 20:55:35.341 baybay[19628:6767151]  HelveticaNeue-LightItalic
2017-02-27 20:55:35.341 baybay[19628:6767151]  HelveticaNeue-UltraLightItalic
2017-02-27 20:55:35.342 baybay[19628:6767151]  HelveticaNeue-MediumItalic
2017-02-27 20:55:35.342 baybay[19628:6767151]  HelveticaNeue
2017-02-27 20:55:35.342 baybay[19628:6767151] Party LET
2017-02-27 20:55:35.342 baybay[19628:6767151]  PartyLetPlain
2017-02-27 20:55:35.343 baybay[19628:6767151] Bodoni Ornaments
2017-02-27 20:55:35.343 baybay[19628:6767151]  BodoniOrnamentsITCTT
2017-02-27 20:55:35.343 baybay[19628:6767151] Material Icons
2017-02-27 20:55:35.343 baybay[19628:6767151]  MaterialIcons-Regular
2017-02-27 20:55:35.343 baybay[19628:6767151] Symbol
2017-02-27 20:55:35.344 baybay[19628:6767151]  Symbol
2017-02-27 20:55:35.344 baybay[19628:6767151] Hiragino Sans
2017-02-27 20:55:35.344 baybay[19628:6767151]  HiraginoSans-W3
2017-02-27 20:55:35.344 baybay[19628:6767151]  HiraginoSans-W6
2017-02-27 20:55:35.345 baybay[19628:6767151] Bangla Sangam MN
2017-02-27 20:55:35.345 baybay[19628:6767151] Cochin
2017-02-27 20:55:35.345 baybay[19628:6767151]  Cochin-Bold
2017-02-27 20:55:35.345 baybay[19628:6767151]  Cochin
2017-02-27 20:55:35.346 baybay[19628:6767151]  Cochin-Italic
2017-02-27 20:55:35.346 baybay[19628:6767151]  Cochin-BoldItalic
2017-02-27 20:55:35.346 baybay[19628:6767151] Euphemia UCAS
2017-02-27 20:55:35.346 baybay[19628:6767151]  EuphemiaUCAS-Italic
2017-02-27 20:55:35.347 baybay[19628:6767151]  EuphemiaUCAS
2017-02-27 20:55:35.347 baybay[19628:6767151]  EuphemiaUCAS-Bold
2017-02-27 20:55:35.347 baybay[19628:6767151] Academy Engraved LET
2017-02-27 20:55:35.347 baybay[19628:6767151]  AcademyEngravedLetPlain
2017-02-27 20:55:35.348 baybay[19628:6767151] Helvetica
2017-02-27 20:55:35.348 baybay[19628:6767151]  Helvetica-Bold
2017-02-27 20:55:35.348 baybay[19628:6767151]  Helvetica
2017-02-27 20:55:35.348 baybay[19628:6767151]  Helvetica-LightOblique
2017-02-27 20:55:35.349 baybay[19628:6767151]  Helvetica-Oblique
2017-02-27 20:55:35.349 baybay[19628:6767151]  Helvetica-BoldOblique
2017-02-27 20:55:35.349 baybay[19628:6767151]  Helvetica-Light
2017-02-27 20:55:35.349 baybay[19628:6767151] American Typewriter
2017-02-27 20:55:35.349 baybay[19628:6767151]  AmericanTypewriter-CondensedLight
2017-02-27 20:55:35.350 baybay[19628:6767151]  AmericanTypewriter
2017-02-27 20:55:35.350 baybay[19628:6767151]  AmericanTypewriter-CondensedBold
2017-02-27 20:55:35.350 baybay[19628:6767151]  AmericanTypewriter-Light
2017-02-27 20:55:35.350 baybay[19628:6767151]  AmericanTypewriter-Semibold
2017-02-27 20:55:35.351 baybay[19628:6767151]  AmericanTypewriter-Bold
2017-02-27 20:55:35.351 baybay[19628:6767151]  AmericanTypewriter-Condensed
2017-02-27 20:55:35.351 baybay[19628:6767151] Didot
2017-02-27 20:55:35.351 baybay[19628:6767151]  Didot-Italic
2017-02-27 20:55:35.351 baybay[19628:6767151]  Didot-Bold
2017-02-27 20:55:35.352 baybay[19628:6767151]  Didot
2017-02-27 20:55:35.352 baybay[19628:6767151] Courier New
2017-02-27 20:55:35.352 baybay[19628:6767151]  CourierNewPS-BoldMT
2017-02-27 20:55:35.352 baybay[19628:6767151]  CourierNewPS-ItalicMT
2017-02-27 20:55:35.353 baybay[19628:6767151]  CourierNewPSMT
2017-02-27 20:55:35.353 baybay[19628:6767151]  CourierNewPS-BoldItalicMT
2017-02-27 20:55:35.353 baybay[19628:6767151] Courier
2017-02-27 20:55:35.353 baybay[19628:6767151]  Courier-BoldOblique
2017-02-27 20:55:35.354 baybay[19628:6767151]  Courier
2017-02-27 20:55:35.354 baybay[19628:6767151]  Courier-Bold
2017-02-27 20:55:35.354 baybay[19628:6767151]  Courier-Oblique
2017-02-27 20:55:35.354 baybay[19628:6767151] Palatino
2017-02-27 20:55:35.355 baybay[19628:6767151]  Palatino-Bold
2017-02-27 20:55:35.355 baybay[19628:6767151]  Palatino-Roman
2017-02-27 20:55:35.355 baybay[19628:6767151]  Palatino-BoldItalic
2017-02-27 20:55:35.355 baybay[19628:6767151]  Palatino-Italic
2017-02-27 20:55:35.356 baybay[19628:6767151] Malayalam Sangam MN
2017-02-27 20:55:35.356 baybay[19628:6767151]  MalayalamSangamMN-Bold
2017-02-27 20:55:35.356 baybay[19628:6767151]  MalayalamSangamMN
2017-02-27 20:55:35.356 baybay[19628:6767151] Mishafi
2017-02-27 20:55:35.356 baybay[19628:6767151]  DiwanMishafi
2017-02-27 20:55:35.357 baybay[19628:6767151] Snell Roundhand
2017-02-27 20:55:35.357 baybay[19628:6767151]  SnellRoundhand-Bold
2017-02-27 20:55:35.357 baybay[19628:6767151]  SnellRoundhand
2017-02-27 20:55:35.357 baybay[19628:6767151]  SnellRoundhand-Black
2017-02-27 20:55:35.358 baybay[19628:6767151] Avenir Next Condensed
2017-02-27 20:55:35.358 baybay[19628:6767151]  AvenirNextCondensed-BoldItalic
2017-02-27 20:55:35.358 baybay[19628:6767151]  AvenirNextCondensed-Heavy
2017-02-27 20:55:35.358 baybay[19628:6767151]  AvenirNextCondensed-Medium
2017-02-27 20:55:35.359 baybay[19628:6767151]  AvenirNextCondensed-Regular
2017-02-27 20:55:35.359 baybay[19628:6767151]  AvenirNextCondensed-HeavyItalic
2017-02-27 20:55:35.359 baybay[19628:6767151]  AvenirNextCondensed-MediumItalic
2017-02-27 20:55:35.359 baybay[19628:6767151]  AvenirNextCondensed-Italic
2017-02-27 20:55:35.359 baybay[19628:6767151]  AvenirNextCondensed-UltraLightItalic
2017-02-27 20:55:35.360 baybay[19628:6767151]  AvenirNextCondensed-UltraLight
2017-02-27 20:55:35.360 baybay[19628:6767151]  AvenirNextCondensed-DemiBold
2017-02-27 20:55:35.360 baybay[19628:6767151]  AvenirNextCondensed-Bold
2017-02-27 20:55:35.360 baybay[19628:6767151]  AvenirNextCondensed-DemiBoldItalic
2017-02-27 20:55:35.360 baybay[19628:6767151] Octicons
2017-02-27 20:55:35.361 baybay[19628:6767151]  Octicons
2017-02-27 20:55:35.361 baybay[19628:6767151] Heiti SC
2017-02-27 20:55:35.361 baybay[19628:6767151] Damascus
2017-02-27 20:55:35.361 baybay[19628:6767151]  DamascusLight
2017-02-27 20:55:35.362 baybay[19628:6767151]  DamascusBold
2017-02-27 20:55:35.362 baybay[19628:6767151]  DamascusSemiBold
2017-02-27 20:55:35.362 baybay[19628:6767151]  DamascusMedium
2017-02-27 20:55:35.362 baybay[19628:6767151]  Damascus
2017-02-27 20:55:35.362 baybay[19628:6767151] Lao Sangam MN
2017-02-27 20:55:35.363 baybay[19628:6767151]  LaoSangamMN
2017-02-27 20:55:35.363 baybay[19628:6767151] Oriya Sangam MN
2017-02-27 20:55:35.363 baybay[19628:6767151]  OriyaSangamMN
2017-02-27 20:55:35.363 baybay[19628:6767151]  OriyaSangamMN-Bold
2017-02-27 20:55:35.364 baybay[19628:6767151] Papyrus
2017-02-27 20:55:35.364 baybay[19628:6767151]  Papyrus
2017-02-27 20:55:35.364 baybay[19628:6767151]  Papyrus-Condensed
2017-02-27 20:55:35.364 baybay[19628:6767151] Copperplate
2017-02-27 20:55:35.365 baybay[19628:6767151]  Copperplate-Light
2017-02-27 20:55:35.365 baybay[19628:6767151]  Copperplate
2017-02-27 20:55:35.366 baybay[19628:6767151]  Copperplate-Bold
2017-02-27 20:55:35.366 baybay[19628:6767151] Thonburi
2017-02-27 20:55:35.366 baybay[19628:6767151]  Thonburi
2017-02-27 20:55:35.366 baybay[19628:6767151]  Thonburi-Bold
2017-02-27 20:55:35.367 baybay[19628:6767151]  Thonburi-Light
2017-02-27 20:55:35.367 baybay[19628:6767151] Kohinoor Bangla
2017-02-27 20:55:35.367 baybay[19628:6767151]  KohinoorBangla-Semibold
2017-02-27 20:55:35.367 baybay[19628:6767151]  KohinoorBangla-Regular
2017-02-27 20:55:35.367 baybay[19628:6767151]  KohinoorBangla-Light
2017-02-27 20:55:35.368 baybay[19628:6767151] Chalkboard SE
2017-02-27 20:55:35.368 baybay[19628:6767151]  ChalkboardSE-Bold
2017-02-27 20:55:35.368 baybay[19628:6767151]  ChalkboardSE-Light
2017-02-27 20:55:35.368 baybay[19628:6767151]  ChalkboardSE-Regular
2017-02-27 20:55:35.369 baybay[19628:6767151] Sinhala Sangam MN
2017-02-27 20:55:35.369 baybay[19628:6767151]  SinhalaSangamMN-Bold
2017-02-27 20:55:35.399 baybay[19628:6767151]  SinhalaSangamMN
2017-02-27 20:55:35.399 baybay[19628:6767151] Noteworthy                **************
2017-02-27 20:55:35.399 baybay[19628:6767151]  Noteworthy-Light
2017-02-27 20:55:35.400 baybay[19628:6767151]  Noteworthy-Bold
2017-02-27 20:55:35.400 baybay[19628:6767151] Farah
2017-02-27 20:55:35.400 baybay[19628:6767151]  Farah
2017-02-27 20:55:35.400 baybay[19628:6767151] Arial
2017-02-27 20:55:35.400 baybay[19628:6767151]  ArialMT
2017-02-27 20:55:35.401 baybay[19628:6767151]  Arial-BoldItalicMT
2017-02-27 20:55:35.401 baybay[19628:6767151]  Arial-BoldMT
2017-02-27 20:55:35.401 baybay[19628:6767151]  Arial-ItalicMT
2017-02-27 20:55:35.401 baybay[19628:6767151] Hiragino Mincho ProN
2017-02-27 20:55:35.401 baybay[19628:6767151]  HiraMinProN-W6
2017-02-27 20:55:35.402 baybay[19628:6767151]  HiraMinProN-W3
2017-02-27 20:55:35.402 baybay[19628:6767151] Georgia
2017-02-27 20:55:35.402 baybay[19628:6767151]  Georgia-BoldItalic
2017-02-27 20:55:35.402 baybay[19628:6767151]  Georgia
2017-02-27 20:55:35.402 baybay[19628:6767151]  Georgia-Italic
2017-02-27 20:55:35.402 baybay[19628:6767151]  Georgia-Bold
2017-02-27 20:55:35.403 baybay[19628:6767151] Verdana
2017-02-27 20:55:35.403 baybay[19628:6767151]  Verdana-Italic
2017-02-27 20:55:35.403 baybay[19628:6767151]  Verdana-BoldItalic
2017-02-27 20:55:35.403 baybay[19628:6767151]  Verdana
2017-02-27 20:55:35.403 baybay[19628:6767151]  Verdana-Bold
2017-02-27 20:55:35.404 baybay[19628:6767151] Apple Color Emoji
2017-02-27 20:55:35.404 baybay[19628:6767151]  AppleColorEmoji
2017-02-27 20:55:35.404 baybay[19628:6767151] EvilIcons
2017-02-27 20:55:35.404 baybay[19628:6767151]  EvilIcons
2017-02-27 20:55:35.404 baybay[19628:6767151] PingFang SC
2017-02-27 20:55:35.405 baybay[19628:6767151]  PingFangSC-Ultralight
2017-02-27 20:55:35.405 baybay[19628:6767151]  PingFangSC-Regular
2017-02-27 20:55:35.405 baybay[19628:6767151]  PingFangSC-Semibold
2017-02-27 20:55:35.405 baybay[19628:6767151]  PingFangSC-Thin
2017-02-27 20:55:35.405 baybay[19628:6767151]  PingFangSC-Light
2017-02-27 20:55:35.405 baybay[19628:6767151]  PingFangSC-Medium
2017-02-27 20:55:35.406 baybay[19628:6767151] Chalkduster
2017-02-27 20:55:35.406 baybay[19628:6767151]  Chalkduster
2017-02-27 20:55:35.406 baybay[19628:6767151] PingFang TC
2017-02-27 20:55:35.406 baybay[19628:6767151]  PingFangTC-Medium
2017-02-27 20:55:35.406 baybay[19628:6767151]  PingFangTC-Regular
2017-02-27 20:55:35.407 baybay[19628:6767151]  PingFangTC-Light
2017-02-27 20:55:35.407 baybay[19628:6767151]  PingFangTC-Ultralight
2017-02-27 20:55:35.407 baybay[19628:6767151]  PingFangTC-Semibold
2017-02-27 20:55:35.407 baybay[19628:6767151]  PingFangTC-Thin
2017-02-27 20:55:35.407 baybay[19628:6767151] Entypo
2017-02-27 20:55:35.408 baybay[19628:6767151]  Entypo
2017-02-27 20:55:35.408 baybay[19628:6767151] Tamil Sangam MN
2017-02-27 20:55:35.408 baybay[19628:6767151]  TamilSangamMN
2017-02-27 20:55:35.408 baybay[19628:6767151]  TamilSangamMN-Bold
2017-02-27 20:55:35.408 baybay[19628:6767151] Khmer Sangam MN
2017-02-27 20:55:35.409 baybay[19628:6767151]  KhmerSangamMN
2017-02-27 20:55:35.409 baybay[19628:6767151] simple-line-icons
2017-02-27 20:55:35.409 baybay[19628:6767151]  simple-line-icons
2017-02-27 20:55:35.409 baybay[19628:6767151] Apple SD Gothic Neo
2017-02-27 20:55:35.409 baybay[19628:6767151]  AppleSDGothicNeo-Bold
2017-02-27 20:55:35.410 baybay[19628:6767151]  AppleSDGothicNeo-UltraLight
2017-02-27 20:55:35.410 baybay[19628:6767151]  AppleSDGothicNeo-Thin
2017-02-27 20:55:35.410 baybay[19628:6767151]  AppleSDGothicNeo-Regular
2017-02-27 20:55:35.410 baybay[19628:6767151]  AppleSDGothicNeo-Light
2017-02-27 20:55:35.410 baybay[19628:6767151]  AppleSDGothicNeo-Medium
2017-02-27 20:55:35.410 baybay[19628:6767151]  AppleSDGothicNeo-SemiBold
2017-02-27 20:55:35.411 baybay[19628:6767151] Gurmukhi MN
2017-02-27 20:55:35.411 baybay[19628:6767151]  GurmukhiMN-Bold
2017-02-27 20:55:35.411 baybay[19628:6767151]  GurmukhiMN
2017-02-27 20:55:35.411 baybay[19628:6767151] Arial Rounded MT Bold
2017-02-27 20:55:35.411 baybay[19628:6767151]  ArialRoundedMTBold
2017-02-27 20:55:35.412 baybay[19628:6767151] Al Nile
2017-02-27 20:55:35.412 baybay[19628:6767151]  AlNile-Bold
2017-02-27 20:55:35.412 baybay[19628:6767151]  AlNile
2017-02-27 20:55:35.412 baybay[19628:6767151] Bodoni 72 Smallcaps
2017-02-27 20:55:35.412 baybay[19628:6767151]  BodoniSvtyTwoSCITCTT-Book
2017-02-27 20:55:35.413 baybay[19628:6767151] Marker Felt
2017-02-27 20:55:35.413 baybay[19628:6767151]  MarkerFelt-Thin
2017-02-27 20:55:35.413 baybay[19628:6767151]  MarkerFelt-Wide
2017-02-27 20:55:35.413 baybay[19628:6767151] Kannada Sangam MN
2017-02-27 20:55:35.413 baybay[19628:6767151]  KannadaSangamMN
2017-02-27 20:55:35.413 baybay[19628:6767151]  KannadaSangamMN-Bold
2017-02-27 20:55:35.414 baybay[19628:6767151] Menlo
2017-02-27 20:55:35.414 baybay[19628:6767151]  Menlo-Italic
2017-02-27 20:55:35.414 baybay[19628:6767151]  Menlo-Bold
2017-02-27 20:55:35.414 baybay[19628:6767151]  Menlo-Regular
2017-02-27 20:55:35.414 baybay[19628:6767151]  Menlo-BoldItalic
2017-02-27 20:55:35.414 baybay[19628:6767151] Avenir
2017-02-27 20:55:35.415 baybay[19628:6767151]  Avenir-Medium
2017-02-27 20:55:35.415 baybay[19628:6767151]  Avenir-HeavyOblique
2017-02-27 20:55:35.415 baybay[19628:6767151]  Avenir-Book
2017-02-27 20:55:35.415 baybay[19628:6767151]  Avenir-Light
2017-02-27 20:55:35.415 baybay[19628:6767151]  Avenir-Roman
2017-02-27 20:55:35.416 baybay[19628:6767151]  Avenir-BookOblique
2017-02-27 20:55:35.416 baybay[19628:6767151]  Avenir-MediumOblique
2017-02-27 20:55:35.416 baybay[19628:6767151]  Avenir-Black
2017-02-27 20:55:35.416 baybay[19628:6767151]  Avenir-BlackOblique
2017-02-27 20:55:35.416 baybay[19628:6767151]  Avenir-Heavy
2017-02-27 20:55:35.417 baybay[19628:6767151]  Avenir-LightOblique
2017-02-27 20:55:35.417 baybay[19628:6767151]  Avenir-Oblique
2017-02-27 20:55:35.417 baybay[19628:6767151] Telugu Sangam MN
2017-02-27 20:55:35.417 baybay[19628:6767151] Gujarati Sangam MN
2017-02-27 20:55:35.417 baybay[19628:6767151]  GujaratiSangamMN-Bold
2017-02-27 20:55:35.417 baybay[19628:6767151]  GujaratiSangamMN
2017-02-27 20:55:35.418 baybay[19628:6767151] Bodoni 72 Oldstyle
2017-02-27 20:55:35.418 baybay[19628:6767151]  BodoniSvtyTwoOSITCTT-Book
2017-02-27 20:55:35.418 baybay[19628:6767151]  BodoniSvtyTwoOSITCTT-Bold
2017-02-27 20:55:35.418 baybay[19628:6767151]  BodoniSvtyTwoOSITCTT-BookIt
2017-02-27 20:55:35.418 baybay[19628:6767151] Myanmar Sangam MN
2017-02-27 20:55:35.419 baybay[19628:6767151]  MyanmarSangamMN-Bold
2017-02-27 20:55:35.419 baybay[19628:6767151]  MyanmarSangamMN
2017-02-27 20:55:35.419 baybay[19628:6767151] Zapf Dingbats
2017-02-27 20:55:35.419 baybay[19628:6767151]  ZapfDingbatsITC
2017-02-27 20:55:35.419 baybay[19628:6767151] Zapfino
2017-02-27 20:55:35.420 baybay[19628:6767151]  Zapfino

local macbook air keyhash
ga0RGNYHvNM5d0SLGQfpQWAPGJ8=

android dev keyhash
dUgWYOkRzglo33e+oayZq9VI6cE=

*/


