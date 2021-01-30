import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const reducers = combineReducers({});

const middleware = [thunk];
const chosenCompose = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;

const initialState = {};
const store = createStore(reducers, initialState, chosenCompose(applyMiddleware(...middleware)));

export default store;
