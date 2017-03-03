import { AsyncStorage } from 'react-native';
import { 
    GET_INITIAL_CHALLENGES,
    SAVE_CHALLENGE,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_CHALLENGES:
            return action.payload;
        case SAVE_CHALLENGE:
            AsyncStorage.mergeItem('challenges', JSON.stringify({ [action.payload.id]: action.payload.value }));
            return { ...state, [action.payload.id]: action.payload.value };
        default:
            return state;
    }
};
