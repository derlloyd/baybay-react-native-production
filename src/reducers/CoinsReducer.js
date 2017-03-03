import { AsyncStorage } from 'react-native';
import { 
    GET_INITIAL_COINS,
    BUY_REMOVE_OPTION,
    REWARD_CHALLENGE,
    COINS_SUBTRACT,
} from '../actions/types';
import Config from '../Config';

const INITIAL_STATE = Config.initialCoins;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_COINS:
            return action.payload;
        case REWARD_CHALLENGE:
            AsyncStorage.setItem('coins', JSON.stringify((state.valueOf() + Config.challengeReward)));
            return state.valueOf() + Config.challengeReward;
        case BUY_REMOVE_OPTION:
            AsyncStorage.setItem('coins', JSON.stringify(state.valueOf() - Config.purchaseOptionCost));
            return state.valueOf() - Config.purchaseOptionCost;
        case COINS_SUBTRACT:
            AsyncStorage.setItem('coins', JSON.stringify(state.valueOf() - action.payload));
            return state.valueOf() - action.payload;
        default:
            return state;
    }
};
