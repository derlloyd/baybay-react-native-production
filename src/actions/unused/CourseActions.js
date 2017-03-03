// actions related to employees, update the prop key with a new value
// arg and payload are objects with keys

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    COURSE_UPDATE, 
    COURSE_CREATE, 
    COURSE_FETCH_SUCCESS,
    COURSE_FETCH_ALL_SUCCESS,
    COURSE_FORM_CLEAR,
    COURSE_SAVE_SUCCESS } from './types';

// called from user settings, when creating course
// --------------------------------------------------------------------------
export const courseFormClear = () => {
    return {
        type: COURSE_FORM_CLEAR
    };
};

export const courseUpdate = ({ prop, value }) => {
    return {
        type: COURSE_UPDATE,
        payload: { prop, value }
    };
};

// in settings, called from Course Create
export const courseCreate = ({ name, phone, shift, desc, videoId }) => {
    // get current user from firebase
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        // path to json db, add record then
        firebase.database().ref('/courses')
            .push({ name, phone, shift, desc, videoId, owner: currentUser.uid })
            .then((result) => {
                console.log('this is the result of pushing to db: ', result); 

                // dispatch action that resets form
                dispatch({ type: COURSE_CREATE });
                // back to list type reset eliminates the back button
                Actions.userInfo({ type: 'reset' });
            });
    };
};



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


// called from course store, return all courses
// --------------------------------------------------------------------------
// export const courseFetchAll = () => {
//     return (dispatch) => {
//         firebase.database().ref('/courses')
//             .on('value', snapshot => {
//                 dispatch({ type: COURSE_FETCH_ALL_SUCCESS, payload: snapshot.val() });
//             });
//     };
// };
