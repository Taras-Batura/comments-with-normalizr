import * as c from './constants';


export const getArticlesList = () => ({
    type: c.GET_ARTICLE_LIST_REQUEST,
});

export const clickLike = (id) => ({
    type: c.CLICK_LIKE,
    id
});