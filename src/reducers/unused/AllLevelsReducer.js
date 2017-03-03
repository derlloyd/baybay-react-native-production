import { FETCH_ALL_LEVELS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_LEVELS:
            // action payload will be firebase snapshot.val()
            return action.payload;
        default:
            return state;
    }
};
