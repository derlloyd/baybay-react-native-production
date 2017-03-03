import { FETCH_SHORTSOUNDS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_SHORTSOUNDS:
            return action.payload;
        default:
            return state;
    }
};
