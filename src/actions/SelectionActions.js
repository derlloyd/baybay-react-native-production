// actions related to categories, levels, and challenges 
// update the prop key with a new value
// arg and payload are objects with keys

import firebase from 'firebase';

// import { NativeModules } from 'react-native';
// // import { Actions } from 'react-native-router-flux';
// // for fetching IOS in app purchase options

// const { InAppUtils } = NativeModules;

import { 
    // FETCH_CATEGORIES, 
    // SHORTSOUND_LOADED,
    CATEGORY_UPDATE, 
    LEVEL_UPDATE, 
    CHALLENGE_UPDATE, 
    ARTIST_OPTIONS_UPDATE, 
    SONG_OPTIONS_UPDATE, 
    FETCH_INITIAL_LEVELS, 
    FETCH_ALL_CHALLENGES, 
    FETCH_ALL_CATEGORIES,
    BUY_REMOVE_OPTION, 
    // GET_COINS_PURCHASE_OPTIONS,
    // FETCH_ALL_GAMESOUNDS,
    // FETCH_AND_REORDER_ALL_CHALLENGES,
 } from './types';
 

// called from first categories screen, return all categories           ****TBD: ORDER BY SORTBY
// -------------------------------------------------------------------------
export const fetchAllCategories = () => {
    // this is async so use redux thunk, return a function with dispatch method as arg
    // get current user from firebase
    // const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref('/categories').orderByChild('categoryName')
        .on('value', snapshot => {
            // console.log('cat actions: ', snapshot.val());
            dispatch({ type: FETCH_ALL_CATEGORIES, payload: snapshot.val() });
        });
    };
};



// called from welcome screen, get all info for all challenges
// re-order to {challengeId: challengeObject} instead of {0: challengeObject}
// -------------------------------------------------------------------------
export const fetchAllChallenges = () => {
    return (dispatch) => {
        firebase.database().ref('/challenges')
        .on('value', snapshot => {
            const newObj = {};
            snapshot.val().forEach((challenge) => {
                newObj[challenge.challengeId] = challenge;
            });
            dispatch({ type: FETCH_ALL_CHALLENGES, payload: newObj });
        });
    };
};

// this will be called from welcome screen, only ONCE, then save to asyncStorage
// -------------------------------------------------------------------------
export const fetchInitialLevels = () => {
    return (dispatch) => {
        firebase.database().ref('/categories')
        .on('value', snapshot => {
            const newObj = {};
            snapshot.val().forEach((category) => {
                category.levels.forEach((level) => {
                    if (level.levelType === 'free') {
                        newObj[level.levelId] = true;
                    }
                });
            });
            dispatch({ type: FETCH_INITIAL_LEVELS, payload: newObj });
        });
    };
};

// called from first categories screen, return coin purchase options
// -------------------------------------------------------------------------
// export const fetchAllCoinsPurchaseOptions = () => {
//     return (dispatch) => {
//         const products = [
//             'com.BayBay.Purchase.Coin1000',
//             'com.BayBay.Purchase.Coin2500',
//             'com.BayBay.Purchase.Coin7000',
//             'com.BayBay.Purchase.Coin16000',
//             ];
//         InAppUtils.loadProducts(products, (error, result) => {
//             console.log('result: ', result);
//             dispatch({ type: GET_COINS_PURCHASE_OPTIONS, payload: result });
//    //update store here.
//     });
//     //     firebase.database().ref('/coins')
//     //     .on('value', snapshot => {
//     //         dispatch({ type: GET_COINS_PURCHASE_OPTIONS, payload: snapshot.val() });
//     //     });
//     // };
// };
// export const fetchAllCoinsPurchaseOptions = () => {
//     return (dispatch) => {
//         firebase.database().ref('/coins')
//         .on('value', snapshot => {
//             dispatch({ type: GET_COINS_PURCHASE_OPTIONS, payload: snapshot.val() });
//         });
//     };
// };

// called from Categories screen, when user clicks a category
// -------------------------------------------------------------------------
export const categoryUpdate = (category, currentCategory) => {
    // expand or hide levels depending on if challenge is already expanded
    if (!currentCategory) {
        // console.log('first cat selected, there is no current category');
        // dispatch action with selected category
        return {
            type: CATEGORY_UPDATE,
            payload: category
        };
    }
    if (category.categoryId !== currentCategory.categoryId) {
        // user clicked another category
        // dispatch action with selected category
        return {
            type: CATEGORY_UPDATE,
            payload: category
        };
    }
    // console.log('clicked same category, remove category from selected');
    return {
        type: CATEGORY_UPDATE,
        payload: null
    };
};

// called from Categories screen, user clicks level so update the level in the state
// -------------------------------------------------------------------------
export const levelUpdate = (level) => {
    return {
        type: LEVEL_UPDATE, 
        payload: level 
    };
};

// called from Challenge Grid when challenge clicked, save passed challenge object to state
// -------------------------------------------------------------------------
export const challengeUpdate = (challenge, i) => {
    return (dispatch) => {
        // if challenges are not re-ordered, need to use lodash to get challenge
        // const result = _.find(allChallenges, { 'challengeId': challengeId });
        dispatch({ type: CHALLENGE_UPDATE, payload: challenge, index: i });
    };
};

// called from Artist or Song (type should be 'song' if in Song screen)
// to remove one of the wrong options
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
export const removeWrongOption = (options, type) => {
    // create new array to store changes in options
    const updatedOptions = options;

    // identify which options can be removed
    const possibleHides = [];
    updatedOptions.forEach((obj, i) => {
        // cannot be correct answer, cannot be option thats already hidden
        if (!obj.correct) {
            if (!obj.hide) {
                possibleHides.push(i);
            }
        }
    });

    // if possiblehides is empty (length = 0), every available option is hidden
    // dispatch user an error 'cant remove any more options'
    if (possibleHides.length === 0) {
        console.log('TO USER: NO MORE OPTIONS TO REMOVE');
        return (dispatch) => {
            dispatch({ type: null, payload: 'No more wrong options to remove' });
        };
    }

    // get a random number from possible hides and hide it
    const max = possibleHides.length - 1;
    const min = 0;

    // x is the position in the possiblehides array that contains the index to hide
    const x = Math.floor(Math.random() * (max - min + 1) + min);  

    // get that number from the array
    const i = possibleHides[x];

    // add hide key value pair to that option in the array
    updatedOptions[i] = { ...updatedOptions[i], hide: true };

    // depends on type argument passed, are we in Artist or Song screen?
    if (type === 'song') {
        return (dispatch) => {
            // this will re-render the options
            dispatch({ type: SONG_OPTIONS_UPDATE, payload: updatedOptions });
            // this will charge the user x amount of coins
            dispatch({ type: BUY_REMOVE_OPTION });
        };
    }
    // else we are in artists
    return (dispatch) => {
        // this will re-render the options
        dispatch({ type: ARTIST_OPTIONS_UPDATE, payload: updatedOptions });
        // this will charge the user x amount of coins
        dispatch({ type: BUY_REMOVE_OPTION });
    };
};






// ACCESSORIES are now stored in Config file
// reason is that the Image source require(image) cannot take a dynamic string, has to be hard coded
// http://stackoverflow.com/questions/30854232/react-native-image-require-module-using-dynamic-names
// called from welcome screen, get all info for all accessories
// -------------------------------------------------------------------------
// export const fetchAllAccessories = () => {
//     return (dispatch) => {
//         firebase.database().ref('/accessories')
//             .on('value', snapshot => {
//                 // console.log('next------: ', snapshot.val());
//                 dispatch({ type: FETCH_ALL_ACCESSORIES, payload: snapshot.val() });
//             }, (error) => {
//                 console.log('error: ', error);
//             });
//     };
// };


// called from Artist or Song
// export const purchaseWrongOption = () => {
//     return { type: BUY_REMOVE_OPTION };
// };

// const payForWrongOption = () => {
//     return { type: BUY_REMOVE_OPTION };
// };

// export const challengeIdUpdate = (challengeId) => {
//     // update the challenge Id in the state, then switch screens
//     return {
//         type: CHALLENGEID_UPDATE, 
//         payload: challengeId
//     };
// };

// in settings, called from Course Create
// export const courseCreate = ({ name, phone, shift, desc, videoId }) => {
//     // get current user from firebase
//     const { currentUser } = firebase.auth();

//     return (dispatch) => {
//         // path to json db, add record then
//         firebase.database().ref('/courses')
//             .push({ name, phone, shift, desc, videoId, owner: currentUser.uid })
//             .then((result) => {
//                 console.log('this is the result of pushing to db: ', result); 

//                 // dispatch action that resets form
//                 dispatch({ type: COURSE_CREATE });
//                 // back to list type reset eliminates the back button
//                 Actions.userInfo({ type: 'reset' });
//             });
//     };
// };



// called from My Courses (CourseList Component) - only get subscribed videos
// --------------------------------------------------------------------------
// export const courseFetch = () => {
//     // this is async so use redux thunk, return a function with dispatch method as arg
//     // get current user from firebase
//     const { currentUser } = firebase.auth();

//     return (dispatch) => {
//         firebase.database().ref(`/users/${currentUser.uid}/courses`)
//             // any time (for entire life cycle of app) any values are added to the db at this path
//             // call the function with data result as snapshot object
//             // its an object that describes data, not an array
//             .on('value', snapshot => {
//                 // dispatch an action
//                 console.log(snapshot);
//                 dispatch({ type: COURSE_FETCH_SUCCESS, payload: snapshot.val() });
//             });
//     };
// };

// export const courseSubscribe = ({ uid }) => {
//     const { currentUser } = firebase.auth();
//     return (dispatch) => {
//         firebase.database().ref(`/users/${currentUser.uid}/courses/${uid}`)
//             .push(true)
//             .then(() => {
//                 dispatch({ type: COURSE_SAVE_SUCCESS });
//                 Actions.courseList({ type: 'reset' });
//             });
//     };
// };

// export const courseUnSubscribe = ({ uid }) => {
//     const { currentUser } = firebase.auth();
//     return () => {
//         firebase.database().ref(`/users/${currentUser.uid}/courses/${uid}`)
//             .remove()
//             .then(() => {
//                 Actions.courseList({ type: 'reset' });
//             });
//     };
// };

// called from first categories screen, get all info for all challenges
// -------------------------------------------------------------------------
// export const fetchAllChallenges = () => {
//     // console.log('fetchallchallenges: ', this.state);
//     return (dispatch) => {
//         firebase.database().ref('/challenges')
//             .on('value', snapshot => {
//                 // console.log('cat actions: ', snapshot.val());
//                 dispatch({ type: FETCH_ALL_CHALLENGES, payload: snapshot.val() });
//             });
//     };
// };
