import { combineReducers } from 'redux';
import ActiveTabReducer from './reducer-selected-tab';
import SearchQuery from './reducer-search-query';
import Favorites from './reducer-favorites';

const allReducers = combineReducers({
    results: SearchQuery,
    activeTab: ActiveTabReducer,
    favorites: Favorites,
});

export default allReducers;
