import { createStore, combineReducers } from 'redux';
//import thunkMiddleware from 'redux-thunk';
import user from './user';

const reducer = combineReducers({ user });
//const middleware = applyMiddleware(forwardToRenderer);

const store = createStore(reducer);

export default store;
