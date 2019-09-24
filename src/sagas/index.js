import { all, fork } from 'redux-saga/effects';

import watchArticlesList from './articlesList';


export default function* root() {
    yield all([
        fork(watchArticlesList),
    ]);
}