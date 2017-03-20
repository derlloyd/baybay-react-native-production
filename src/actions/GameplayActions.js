// actions related to gameplay
// update the prop key with a new value
// arg and payload are objects with keys

import firebase from 'firebase';
import { Platform, AsyncStorage } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { 
    REWARD_CHALLENGE,
    GET_INITIAL_COINS,
    GET_INITIAL_ACCESSORIES,
    GET_INITIAL_CHALLENGES,
    GET_INITIAL_LEVELS,
    SHORTSOUND_LOADED,
    TOGGLE_SWITCH_ACCESSORY, 
    FETCH_SHORTSOUNDS,
    FETCH_ALL_GAMESOUNDS,
    COINS_SUBTRACT,
    SAVE_CHALLENGE,
    SAVE_LEVEL,
 } from './types';
import Config from '../Config';

// helper function that downloads remote files to device localpath
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
const fetchBlob = (filename, id, localpath, remotepath, callback) => {
    // check if file passed exists locally, if not, load it
    // for android localstorage, no need to encode and add %20 
    const filenameEncoded = filename.replace(/ /g, '%20');
    let filePath = 'file://' + localpath + filename;  // android OK

    if (Platform.OS === 'ios') {
        filePath = localpath + filename;     // ios OK
    }
    // console.log('filepath: ', filePath);
    // await
    RNFetchBlob.fs.exists(filePath)
        .then((exist) => {
            if (exist) {
                // console.log(`file ${filename} exists, do not load`);
                if (callback) {
                    callback();
                }
                return;
            }
            // console.log(`file ${filename} does not exist, LOAD it`);
            // must remove spaces from filename to fetch remote
            RNFetchBlob
                .config({
                    fileCache: true,
                    path: localpath + filename,
                })
                .fetch('GET', remotepath + filenameEncoded, {
                })
                .then((res) => {
                    // console.log('file saved to ', res.path());
                    // add filename to localstorage to have a list of loaded babysounds
                    if (localpath === Config.localChallenges) {
                        AsyncStorage.mergeItem('shortsounds', JSON.stringify({ [id]: filename }));
                    }

                    if (callback) {
                        callback();
                    }
                })
                .catch((err) => {
                    // console.log('fetchBlob error: ', err);
                });
        })
        .catch((err) => {
            // console.log('fetchBlob error: ', err);
        });
};

// this will be called from welcome screen
// -------------------------------------------------------------------------
export const fetchIntroBabysounds = () => {
    return (dispatch) => {
        // from comp will mount, check if any challenges won
        // if not, load at least a few babysounds for babyclick
        AsyncStorage.getItem('shortsounds', (err, asyncShortsounds) => {
            let shortsounds = [];

            if (!asyncShortsounds) {
                // there is nothing in asyncstorage shortsounds, first time played

                shortsounds = Config.initialShortsounds;

                // fetch mp3s for these songs
                shortsounds.forEach((sound) => {
                    fetchBlob(sound.shortUrl, sound.challengeId, Config.localChallenges, Config.remoteChallenges);
                    // this.props.fetchChallengeShortSound(sound);
                });
            } else {
                // convert async string to an object { a001: 'song.mp3', a002: 'song.mp3' }
                const allShortsounds = JSON.parse(asyncShortsounds);

                // push each loaded sound to shortsounds
                Object.entries(allShortsounds).forEach((soundObj) => {
                    shortsounds.push({ challengeId: soundObj[0], shortUrl: soundObj[1] });
                });
            }

            // add sounds to state object
            // now babyface can render
            dispatch({ type: FETCH_SHORTSOUNDS, payload: shortsounds });
        });
    };
};

// called from first categories screen, return all categories
// -------------------------------------------------------------------------
export const fetchAllGamesounds = () => {
    return (dispatch) => {
        firebase.database().ref('/gamesounds')
        .on('value', snapshot => {
            snapshot.val().forEach((obj) => {
                obj.urls.forEach((item, i) => {
                    fetchBlob(item.url, i, Config.localGamesounds, Config.remoteGamesounds);
                });
            });
            dispatch({ type: FETCH_ALL_GAMESOUNDS, payload: snapshot.val() });
        });
    };
};

// these will be called from welcome screen, get from asyncStorage
// -------------------------------------------------------------------------
export const getInitialCoins = (coins) => {
    // coins should be passed in from asyncStorage, if they exist
    return (dispatch) => {
        dispatch({ type: GET_INITIAL_COINS, payload: coins });
    };
};

export const getInitialAccessories = (accessories) => {
    // accessories should be passed in from asyncStorage, if they exist
    return (dispatch) => {
        dispatch({ type: GET_INITIAL_ACCESSORIES, payload: accessories });
    };
};

export const getInitialLevels = (levels) => {
    // levels should be passed in from asyncStorage, if they exist
    // console.log('getInitialLevels ', levels);
    return (dispatch) => {
        dispatch({ type: GET_INITIAL_LEVELS, payload: levels });
    };
};

export const getInitialChallenges = (challenges) => {
    // challenges should be passed in from asyncStorage, if they exist
    return (dispatch) => {
        dispatch({ type: GET_INITIAL_CHALLENGES, payload: challenges });
    };
};

// this will be called from challenge Grid screen
// -------------------------------------------------------------------------
export const resetShortSound = () => {
    // reset state for loaded babyface
    return (dispatch) => {
        dispatch({ type: SHORTSOUND_LOADED, payload: false });
    };
};

// this will be called from Artist screen componentWillMount
// -------------------------------------------------------------------------
export const fetchChallengeShortSound = (challenge) => {
    // console.log('in passed challenge ', challenge);
    return (dispatch) => {
        // check if sound loaded, get or load it, then dispatch action
        const callback = () => dispatch({ type: SHORTSOUND_LOADED, payload: true });
        fetchBlob(challenge.shortUrl, challenge.challengeId, Config.localChallenges, Config.remoteChallenges, callback);
        dispatch({ type: null, payload: null });
    };
};

export const fetchChallengeLongSound = (challenge) => {
    // call helper function, no need for callback when done
    fetchBlob(challenge.longUrl, challenge.challengeId, Config.localChallengesLong, Config.remoteChallenges);
    return (dispatch) => {
        dispatch({ type: null, payload: null });
    };
};

// called from correct screen, componentDidMount
// -------------------------------------------------------------------------
export const rewardChallenge = () => {
    return (dispatch) => {
        dispatch({ type: REWARD_CHALLENGE });
    };
};

// called from CORRECT or WRONG screen, saves challenge id value as true or false
// -------------------------------------------------------------------------
export const saveChallenge = (id, value) => {
    return (dispatch) => {
        dispatch({ type: SAVE_CHALLENGE, payload: { id, value } });
    };
};

// called from CATEGORIES screen after purchased, saves level id value as true or false
// called from initial fetch levels
// -------------------------------------------------------------------------
export const saveLevel = (id, value) => {
    return (dispatch) => {
        dispatch({ type: SAVE_LEVEL, payload: { id, value } });
    };
};

// called from Settings Accessories, toggle switch
// -------------------------------------------------------------------------
export const toggleSwitchAccessory = (name, value) => {
    return (dispatch) => {
        dispatch({ type: TOGGLE_SWITCH_ACCESSORY, payload: { name, value } });
    };
};

// called from Settings, after anything purchased
// -------------------------------------------------------------------------
export const coinsSubtract = (coins) => {
    return (dispatch) => {
        dispatch({ type: COINS_SUBTRACT, payload: coins.valueOf() });
    };
};
