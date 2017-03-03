import { AsyncStorage } from 'react-native';
import { TOGGLE_SWITCH_ACCESSORY, GET_INITIAL_ACCESSORIES } from '../actions/types';

const INITIAL_STATE = {
    greeneyes: '',
    blueeyes: '',
    aviator: '',
    rainbow: '',
    headphones: '',
    fedora: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_ACCESSORIES:
            return action.payload;
        case TOGGLE_SWITCH_ACCESSORY:
            AsyncStorage.mergeItem('accessories', JSON.stringify({ [action.payload.name]: action.payload.value }));
            return { ...state, [action.payload.name]: action.payload.value };
        default:
            return state;
    }
};
