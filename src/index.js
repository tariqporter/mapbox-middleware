import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import mapBoxGlMiddleware from './reducers/mapbox-gl-middleware';
import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';

export const store = createStore(rootReducer, compose(
  applyMiddleware(thunk, mapBoxGlMiddleware),
));

const Index = () => (
  <Provider store={store}><App /></Provider>
);

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
