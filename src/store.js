import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import createReducer from './reducer';
import rootSaga from './sagas';

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [sagaMiddleware];

    const enhancers = [
        applyMiddleware(...middlewares)
    ];

    if (process.env.NODE_ENV === 'development') {
        const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
      
        if (typeof devToolsExtension === 'function') {
          enhancers.push(devToolsExtension())
        }
      }

    const rootReducer = createReducer();
    const store = createStore(
        rootReducer,
        initialState,
        compose(...enhancers)
    );

    sagaMiddleware.run(rootSaga);

    return store;
}