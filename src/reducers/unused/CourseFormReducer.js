import { COURSE_UPDATE, COURSE_CREATE, COURSE_SAVE_SUCCESS, COURSE_FORM_CLEAR } from '../actions/types';

const INITIAL_STATE = { name: '', phone: '', shift: 'Monday' };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COURSE_UPDATE:
            // action.payload === { prop: 'name', value: 'jane' }
            // es6 syntax, key interpolation []
            return { ...state, [action.payload.prop]: action.payload.value };
        case COURSE_CREATE:
            // new user created, clear the form
            return INITIAL_STATE;
        case COURSE_SAVE_SUCCESS:
            // record changed, clear the form
            return INITIAL_STATE;
        case COURSE_FORM_CLEAR:
            // clear the form
            return INITIAL_STATE;
        default:
            return state;
    }
};
