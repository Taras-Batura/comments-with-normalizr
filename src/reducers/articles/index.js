import { combineReducers } from 'redux';

import * as c from './constants';

const initialState = {
    articles: {},
    comments: {}
};

const articles = (state = initialState.articles, action) => {
    switch (action.type) {
        case c.GET_ARTICLE_LIST_SUCCESS:
            return { ...state, ...action.data };
        case c.GET_ARTICLE_LIST_FAIL:
            return {...state};
        default:
            return state;
    }
};

const comments = (state = initialState.comments, action) => {
    switch (action.type) {
        case c.GET_COMMENTS_LIST_SUCCESS:
            return { ...state, ...action.data };
        case c.GET_COMMENTS_LIST_FAIL:
            return {...state};

        case c.CLICK_LIKE:
            const id = action.id;

            return {
                ...state,
                  entities: {
                    ...state.entities,
                    replies: {
                      ...state.entities.replies,
                      [id]: { 
                        ...state.entities.replies[id],
                        likes: state.entities.replies[id].likes+=1,
                      }
                    }
                  }
              }
        default:
            return state;
    }
};


export default combineReducers({
    articles,
    comments
});