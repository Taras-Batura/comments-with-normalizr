import { combineReducers } from 'redux';

import {
    articlesList,
} from './reducers';


export default function createReducer() {
    return combineReducers({    
        articlesList
    });
}