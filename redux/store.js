import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import businessesReducer from './reducers/businessesReducer';
import searchReducer from './reducers/searchReducer';
import uiReducer from './reducers/uiReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const reducers = combineReducers({
   search: searchReducer,
   businesses: businessesReducer,
   ui: uiReducer
});

const middleware = [thunk];
const chosenCompose = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;

const initialState = {};
const store = createStore(reducers, initialState, chosenCompose(applyMiddleware(...middleware)));

export default store;
