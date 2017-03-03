import { COURSE_FETCH_ALL_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COURSE_FETCH_ALL_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
