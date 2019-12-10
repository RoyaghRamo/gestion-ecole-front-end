// Redux Store

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// With this, we'll be importing the reducer called rootReducer 
// Since the combineReducers is coming from redux
// It knows that the rootReducer is coming from combineReducers

import rootReducer from "./reducers";

// 1) Set up the initial state of the application
const initialState = {};

// 2) Define the middleware we'll be using
const middleware = [thunk];

// 3) Define the store
let store;

const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

if (window.navigator.userAgent.includes("Firefox") && ReactReduxDevTools) {
    // 4) Set up the store so that it works on Chrome
    store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            ReactReduxDevTools
        ));
}

else {
    // 5) Doing a generic setup for it to work with other browsers
    store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware)));
}
// 6) Set up the store in App.js

export default store;