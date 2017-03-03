import { FETCH_ALL_CHALLENGES } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_CHALLENGES:
            return action.payload;
        default:
            return state;
    }
};
