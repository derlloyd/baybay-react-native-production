// ACTIONS

import firebase from 'firebase';

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
