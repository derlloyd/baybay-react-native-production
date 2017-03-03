import { COURSE_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COURSE_FETCH_SUCCESS:
            // action payload will be firebase snapshot.val()
            return action.payload;
        default:
            return state;
    }
};
