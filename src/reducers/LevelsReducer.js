import { AsyncStorage } from 'react-native';
import { 
    FETCH_INITIAL_LEVELS,
    SAVE_LEVEL,
    GET_INITIAL_LEVELS,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_INITIAL_LEVELS:
            AsyncStorage.setItem('levels', JSON.stringify(action.payload));
            return action.payload;
        case GET_INITIAL_LEVELS:
            return action.payload;
        case SAVE_LEVEL:
            AsyncStorage.mergeItem('levels', JSON.stringify({ [action.payload.id]: action.payload.value }));
            return { ...state, [action.payload.id]: action.payload.value };
        default:
            return state;
    }
};
