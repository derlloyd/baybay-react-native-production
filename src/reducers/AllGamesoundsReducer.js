import { FETCH_ALL_GAMESOUNDS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_GAMESOUNDS:
            return action.payload;
        default:
            return state;
    }
};
