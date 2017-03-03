import { 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
 } from '../actions/types';

const INITIAL_STATE = { 
    user: null, 
    error: '', 
    errorDetail: '', 
    loading: false 
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loading: true, error: '', errorDetail: '' };
        case LOGIN_USER_SUCCESS:    // reset back to initial state, but with user object
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Authentication Failed', errorDetail: action.payload.message, password: '', loading: false };
        default:
            return state;
    }
};
