import { SHORTSOUND_LOADED } from '../actions/types';

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHORTSOUND_LOADED:
            return action.payload;
        default:
            return state;
    }
};
