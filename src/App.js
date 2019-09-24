import React from 'react';
import { Provider } from 'react-redux';
import { ArticlesList } from './components';
import configureStore from './store';
import './App.css';


const initialState = {};
export const store = configureStore(initialState);


function App() {
  return (
    <Provider store={store}>
      <ArticlesList />
    </Provider>
  );
}

export default App;
