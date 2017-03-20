// REDUCERS

import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AllCategoriesReducer from './AllCategoriesReducer';
import AllChallengesReducer from './AllChallengesReducer';
import AllGamesoundsReducer from './AllGamesoundsReducer';
import SelectionReducer from './SelectionReducer';
import CoinsReducer from './CoinsReducer';
import AccessoriesReducer from './AccessoriesReducer';
import ChallengesReducer from './ChallengesReducer';
import LevelsReducer from './LevelsReducer';
import ShortsoundsReducer from './ShortsoundsReducer';


export default combineReducers({
    auth: AuthReducer,
    allCategories: AllCategoriesReducer,
    allChallenges: AllChallengesReducer,
    selected: SelectionReducer,
    coins: CoinsReducer,
    accessories: AccessoriesReducer,
    challenges: ChallengesReducer,
    levels: LevelsReducer,
    gamesounds: AllGamesoundsReducer,
    shortsounds: ShortsoundsReducer,
});
