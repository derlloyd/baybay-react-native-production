// ACTIONS

import firebase from 'firebase';
// import { AsyncStorage } from 'react-native';
// import { Actions } from 'react-native-router-flux';
// import { 
//     // LOGIN_USER_SUCCESS,
//     // LOGIN_USER_FAIL,
//     // LOGIN_USER
// } from './types';

export const saveUserInfoToFirebase = (uid, thisProps, nextProps) => {
    if (!nextProps) {
        return () => {};
    }
    if (thisProps.coins !== nextProps.coins) {
        // console.log('coins have changed ', thisProps.coins, nextProps.coins);
        firebase.database().ref('users/' + uid + '/coins').set(nextProps.coins);
    }
    if (thisProps.levels !== nextProps.levels) {
        // console.log('levels have changed ', thisProps.levels, nextProps.levels);
        firebase.database().ref('users/' + uid + '/levels').set(nextProps.levels);
    }
    if (thisProps.accessories !== nextProps.accessories) {
        // console.log('accessories have changed ', thisProps.accessories, nextProps.accessories);
        firebase.database().ref('users/' + uid + '/accessories').set(nextProps.accessories);
    }
    if (thisProps.challenges !== nextProps.challenges) {
        // console.log('challenges have changed ', thisProps.challenges, nextProps.challenges);
        firebase.database().ref('users/' + uid + '/challenges').set(nextProps.challenges);
    }
    return () => {};
};

    // console.log('in saveinfotofirebase, this, next ...', thisProps, nextProps);
    // called from componentWillReceiveProps
    // if relevant props have changed, save them to firebase

    // if (thisProps.coins) {
    //     // console.log('coins have changed ', thisProps.coins, nextProps.coins);
    //     firebase.database().ref('users/' + uid + '/coins').set(thisProps.coins);
    // }
    // if (thisProps.levels) {
    //     // console.log('levels have changed ', thisProps.levels, nextProps.levels);
    //     firebase.database().ref('users/' + uid + '/levels').set(thisProps.levels);
    // }
    // if (thisProps.accessories) {
    //     // console.log('accessories have changed ', thisProps.accessories, nextProps.accessories);
    //     firebase.database().ref('users/' + uid + '/accessories').set(thisProps.accessories);
    // }
    // if (thisProps.challenges) {
    //     // console.log('challenges have changed ', thisProps.challenges, nextProps.challenges);
    //     firebase.database().ref('users/' + uid + '/challenges').set(thisProps.challenges);
    // }
// export const mergeFirebaseInfoToAsyncStorage = (uid, callback) => {
//     // if user data exists in firebase that is not in asyncstorage, this will save it locally
//     // only time that user data from firebase is retrieved
//     const firebaseData = {};
//     const asyncData = {};

//     firebase.database().ref('users/' + uid + '/coins').once('value').then((snapshot) => {
//         console.log('coins from firebase ', snapshot.val());
//         firebaseData.coins = snapshot.val();
//     })
//     .then(() => {
//         firebase.database().ref('users/' + uid + '/levels').once('value').then((snapshot) => {
//             firebaseData.levels = snapshot.val();
//         })
//         .then(() => {
//             firebase.database().ref('users/' + uid + '/challenges').once('value').then((snapshot) => {
//                 firebaseData.challenges = snapshot.val();
//             })
//             .then(() => {
//                 firebase.database().ref('users/' + uid + '/accessories').once('value').then((snapshot) => {
//                     firebaseData.accessories = snapshot.val();
//                 })
//                 .then(() => {
//                     AsyncStorage.getItem('coins')
//                     .then((result) => { asyncData.coins = JSON.parse(result); })
//                     .then(() => {
//                         AsyncStorage.getItem('levels')
//                         .then((result) => { asyncData.levels = JSON.parse(result); })
//                         .then(() => {
//                             AsyncStorage.getItem('challenges')
//                             .then((result) => { asyncData.challenges = JSON.parse(result); })
//                             .then(() => {
//                                 AsyncStorage.getItem('accessories')
//                                 .then((result) => { asyncData.accessories = JSON.parse(result); })
//                                 .then(() => {
//                                     // now have 2 objects, merge the two, set to asyncstorage
//                                     const merged = { ...asyncData, ...firebaseData };
//                                     AsyncStorage.setItem('coins', JSON.stringify(merged.coins))
//                                     .then(() => {
//                                         AsyncStorage.setItem('levels', JSON.stringify(merged.levels))
//                                         .then(() => {
//                                             AsyncStorage.setItem('challenges', JSON.stringify(merged.challenges))
//                                             .then(() => {
//                                                 AsyncStorage.setItem('accessories', JSON.stringify(merged.accessories))
//                                                 .then(() => {
//                                                     callback();
//                                                 });
//                                             });
//                                         });
//                                     });

//                                     console.log('firebase obj ', firebaseData);
//                                     console.log('async obj obj ', asyncData);
//                                     console.log('merged obj ', merged);
//                                 })
//                                 .then(() => {
//                                     // callback();
//                                 });
//                                 // .then(() => {
//                                     // callback2();
//                                 // });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
//     });
//     return () => {};
// };
    // firebase.database().ref('users/' + uid + '/coins').once('value').then((snapshot) => {
    //     firebaseData.coins = snapshot.val();
    // })
    // .then(() => {
    //     firebase.database().ref('users/' + uid + '/levels').once('value').then((snapshot) => {
    //         firebaseData.levels = snapshot.val();
    //     });

    // });
    // firebase.database().ref('users/' + uid + '/challenges').once('value').then((snapshot) => {
    //     firebaseData.challenges = snapshot.val();
    // });
    // firebase.database().ref('users/' + uid + '/accessories').once('value').then((snapshot) => {
    //     firebaseData.accessories = snapshot.val();
    // });





// export const signOut = () => {
//     return () => {
//         firebase.auth().signOut()
//             .then(() => Actions.welcome());
//     };
// };

// export const playAnonymous = () => {
//     return (dispatch) => {
//         // dispatch({ type: LOGIN_USER });  // login process begins, start spinner


//         // auth.user.refreshToken
//         // "AJly3UUE4S6VNrOfaj1bp1puJKJW5Dn4EiHXBloVDTWGFHP6V-dyNP2BX186mhKcuSppda-B20tzgQ9VXjE2CnqaFE3TlNxyVMm_INEvPAGBWPMoz1t0i4CmoYRsslDv28flzHuQ20aLVJ6wpZAnDA2DiCKH89_athZwfpSOt1DrMVoC-JzENVs"

// // auth.user.uid
// // "HipT39j3RWRYwxpmddpgbtmEwvM2"

//         // check localstorage to see if user already exists, if so login
//         // const credential = 'PMuMioSgqnWj6ookht5WiEI5aTu1';
//         // firebase.auth().signInWithCredential(credential)
//         //         .then(user => loginUserSuccess(dispatch, user))
//         //         .catch((error) => loginUserFail(dispatch, error));

//         // TODO get this from asyncstorage
//         // ask firebase if curentuser is logged in
//         // const user = firebase.auth().currentUser;
//         // if (user) {
//         //     // already logged in, go to next scene
//         //     loginUserSuccess(dispatch, user);
//         // } else {
//         // if none found, login anonymous and store user in asyncstorage
//         firebase.auth().signInAnonymously()
//             .then((userObj) => loginUserSuccess(dispatch, userObj))
//             .catch((error) => loginUserFail(dispatch, error));
//         // }
//     };
// };

// export const loginWithFacebook = () => {

//     // firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(fbAccessToken))
//     // async function loginWithFacebook() {
//     const provider = new firebase.auth.FacebookAuthProvider();
//     return (dispatch) => {
//         dispatch({ type: LOGIN_USER });  // login process begins, start spinner
//         firebase.auth().signInWithRedirect(provider)                    // could also be signInWithToken
//             .then(result => loginUserSuccess(dispatch, result.user))
//             .catch((error) => loginUserFail(dispatch, error));

//         // if (type === 'success') {
//         // // Build Firebase credential with the Facebook access token.
//         //     const credential = firebase.auth.FacebookAuthProvider.credential(token);

//         //     // Sign in with credential from the Facebook user.
//         //     firebase.auth().signInWithRedirect(provider)
//         //         .then(user => loginUserSuccess(dispatch, user))
//         //         .catch((error) => loginUserFail(dispatch, error));
//         // } else {
//         //     const error = 'logInWithReadPermissionsAsync failed';
//         //     loginUserFail(dispatch, error);
//         // }
//     };
// };

// helper functions
// const loginUserFail = (dispatch, error) => {
//     console.log('fail error: ', error);
//     dispatch({ type: LOGIN_USER_FAIL, payload: error });
// };

// const loginUserSuccess = (dispatch, user) => {
//     // only need to save some info for anonymous users
//     const userInfo = {
//         refreshToken: user.refreshToken,
//         uid: user.uid
//     };
//     user.getToken().then((data) => {
//         userInfo.token = data;
//     })
//     .then(() => {
//         console.log('anonymous user: ', userInfo);
//         AsyncStorage.setItem('user', JSON.stringify(userInfo));
//         dispatch({ type: LOGIN_USER_SUCCESS, payload: userInfo });
//     });
//     // console.log('currentuser ', firebase.auth().currentUser);
//     // console.log('user: ', user);
//     // Actions.categories();
// };

// export const emailChanged = (text) => {
//     return {
//         type: EMAIL_CHANGED,
//         payload: text
//     };
// };

// export const passwordChanged = (text) => {
//     return {
//         type: PASSWORD_CHANGED,
//         payload: text
//     }; 
// };

// export const createUser = ({ email, password }) => {
//     return (dispatch) => {
//         dispatch({ type: LOGIN_USER });  // login process begins, start spinner

//         firebase.auth().createUserWithEmailAndPassword(email, password)
//             .then(user => loginUserSuccess(dispatch, user))
//             .catch((error) => loginUserFail(dispatch, error));
//     };
// };


// asynchronous action, so using thunk to return a function
// after request is complete, dispatch an action
// export const loginUser = ({ email, password }) => {
//     return (dispatch) => {
//         dispatch({ type: LOGIN_USER });  // login process begins, start spinner

//         firebase.auth().signInWithEmailAndPassword(email, password)
//             .then(user => loginUserSuccess(dispatch, user))
//             .catch((error) => loginUserFail(dispatch, error));
//     };
// };
