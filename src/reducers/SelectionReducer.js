import { 
    CATEGORY_UPDATE, 
    LEVEL_UPDATE, 
    CHALLENGE_UPDATE, 
    ARTIST_OPTIONS_UPDATE, 
    SONG_OPTIONS_UPDATE,
    SHORTSOUND_LOADED, 
} from '../actions/types';

const INITIAL_STATE = {
    category: null,
    level: null,
    challenge: null,
    challengeIndex: null,
    artistOptions: null,
    songOptions: null,
    shortSoundLoaded: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CATEGORY_UPDATE:
            return { ...state, category: action.payload };
        case LEVEL_UPDATE:
            return { ...state, level: action.payload };
        case CHALLENGE_UPDATE:
            return { ...state, challenge: action.payload, challengeIndex: action.index, artistOptions: action.payload.artistOptions, songOptions: action.payload.songOptions };
        case ARTIST_OPTIONS_UPDATE:
            return { ...state, artistOptions: action.payload };
        case SONG_OPTIONS_UPDATE:
            return { ...state, songOptions: action.payload };
        case SHORTSOUND_LOADED:
            return { ...state, shortSoundLoaded: action.payload };
        default:
            return state;
    }
};
