import { all, take, fork, put, call } from 'redux-saga/effects';
import { articleAPI, commentsAPI } from '../utils';
import { normalizeData } from '../helpers';
import * as c from '../reducers/articles/constants';


function* getArticlesList() {
    while (true) {
        yield take(c.GET_ARTICLE_LIST_REQUEST);

        try{
            const articles = yield call(articleAPI.get);
            
            yield put({
                type: c.GET_ARTICLE_LIST_SUCCESS,
                data: articles
            });

            if(articles !== {}) {
                yield put({
                    type: c.GET_COMMENTS_LIST_REQUEST,
                });
            }
        } catch (error) {
            console.log(error);
            yield put({
                type: c.GET_ARTICLE_LIST_FAIL,
                error
            });
        }
    }
}


function* getCommentsList() {
    while (true) {
        yield take(c.GET_COMMENTS_LIST_REQUEST);

        try{
            const comments = yield call(commentsAPI.get);
            const normalizedData = normalizeData(comments);
            yield put({
                type: c.GET_COMMENTS_LIST_SUCCESS,
                data: normalizedData
            });
        } catch (error) {
            console.log(error);
            yield put({
                type: c.GET_COMMENTS_LIST_FAIL,
                error
            });
        }
    }
}



function* watch() {
    yield all([
        fork(getArticlesList),
        fork(getCommentsList)
    ]);
}

export default watch;