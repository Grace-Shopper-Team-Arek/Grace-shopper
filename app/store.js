import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './reducers/auth';
import cart from './reducers/cart';

const reducer = combineReducers({
  auth,
  cart
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './reducers/auth';
export * from './reducers/cart';
