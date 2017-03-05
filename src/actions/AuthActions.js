// ACTIONS

import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';

export const signOut = () => {
    return () => {
        firebase.auth().signOut()
            .then(() => Actions.welcome());
    };
};

export const playAnonymous = () => {
    return (dispatch) => {
        // dispatch({ type: LOGIN_USER });  // login process begins, start spinner


        // auth.user.refreshToken
        // "AJly3UUE4S6VNrOfaj1bp1puJKJW5Dn4EiHXBloVDTWGFHP6V-dyNP2BX186mhKcuSppda-B20tzgQ9VXjE2CnqaFE3TlNxyVMm_INEvPAGBWPMoz1t0i4CmoYRsslDv28flzHuQ20aLVJ6wpZAnDA2DiCKH89_athZwfpSOt1DrMVoC-JzENVs"

// auth.user.uid
// "HipT39j3RWRYwxpmddpgbtmEwvM2"

        // check localstorage to see if user already exists, if so login
        // const credential = 'PMuMioSgqnWj6ookht5WiEI5aTu1';
        // firebase.auth().signInWithCredential(credential)
        //         .then(user => loginUserSuccess(dispatch, user))
        //         .catch((error) => loginUserFail(dispatch, error));

        // TODO get this from asyncstorage
        // ask firebase if curentuser is logged in
        // const user = firebase.auth().currentUser;
        // if (user) {
        //     // already logged in, go to next scene
        //     loginUserSuccess(dispatch, user);
        // } else {
        // if none found, login anonymous and store user in asyncstorage
        firebase.auth().signInAnonymously()
            .then((userObj) => loginUserSuccess(dispatch, userObj))
            .catch((error) => loginUserFail(dispatch, error));
        // }
    };
};

export const loginWithFacebook = () => {

    // firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(fbAccessToken))
    // async function loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });  // login process begins, start spinner
        firebase.auth().signInWithRedirect(provider)                    // could also be signInWithToken
            .then(result => loginUserSuccess(dispatch, result.user))
            .catch((error) => loginUserFail(dispatch, error));

        // if (type === 'success') {
        // // Build Firebase credential with the Facebook access token.
        //     const credential = firebase.auth.FacebookAuthProvider.credential(token);

        //     // Sign in with credential from the Facebook user.
        //     firebase.auth().signInWithRedirect(provider)
        //         .then(user => loginUserSuccess(dispatch, user))
        //         .catch((error) => loginUserFail(dispatch, error));
        // } else {
        //     const error = 'logInWithReadPermissionsAsync failed';
        //     loginUserFail(dispatch, error);
        // }
    };
};

// helper functions
const loginUserFail = (dispatch, error) => {
    console.log('fail error: ', error);
    dispatch({ type: LOGIN_USER_FAIL, payload: error });
};

const loginUserSuccess = (dispatch, user) => {
    // only need to save some info for anonymous users
    const userInfo = {
        refreshToken: user.refreshToken,
        uid: user.uid
    };
    user.getToken().then((data) => {
        userInfo.token = data;
    })
    .then(() => {
        console.log('anonymous user: ', userInfo);
        AsyncStorage.setItem('user', JSON.stringify(userInfo));
        dispatch({ type: LOGIN_USER_SUCCESS, payload: userInfo });
    });
    // console.log('currentuser ', firebase.auth().currentUser);
    // console.log('user: ', user);
    // Actions.categories();
};

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
