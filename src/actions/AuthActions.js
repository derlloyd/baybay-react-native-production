// ACTIONS

import firebase from 'firebase';
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
        dispatch({ type: LOGIN_USER });  // login process begins, start spinner

        // check localstorage to see if user already exists, if so login
        // const credential = 'PMuMioSgqnWj6ookht5WiEI5aTu1';
        // firebase.auth().signInWithCredential(credential)
        //         .then(user => loginUserSuccess(dispatch, user))
        //         .catch((error) => loginUserFail(dispatch, error));

        // TODO get this from asyncstorage
        // ask firebase if curentuser is logged in
        const user = firebase.auth().currentUser;
        if (user) {
            // already logged in, go to next scene
            loginUserSuccess(dispatch, user);
        } else {
        // if none found, login anonymous and store user in asyncstorage
        firebase.auth().signInAnonymously()
            .then((userObj) => loginUserSuccess(dispatch, userObj))
            .catch((error) => loginUserFail(dispatch, error));
        }
    };
};

export const loginWithFacebook = () => {
    // async function loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });  // login process begins, start spinner
        firebase.auth().signInWithRedirect(provider)
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
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
    // console.log('user: ', user);
    Actions.categories();
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
