import { FETCH_ALL_CATEGORIES } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_CATEGORIES:
            return action.payload;
        default:
            return state;
    }
};
