import { FETCH_CHALLENGE } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CHALLENGE:
            // action payload will be firebase snapshot.val()
            return action.payload;
            // return { ...state, categories: action.payload };
        default:
            return state;
    }
};
