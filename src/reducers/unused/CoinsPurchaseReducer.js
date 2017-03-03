// import { AsyncStorage } from 'react-native';
import { 
    GET_COINS_PURCHASE_OPTIONS,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_COINS_PURCHASE_OPTIONS:
            return action.payload;
        default:
            return state;
    }
};
