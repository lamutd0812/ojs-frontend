import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducers from './reducers/authReducers';
import submissionReducers from './reducers/submissionReducers';
import reviewReducers from './reducers/reviewReducers';
import articleReducer from './reducers/articleReducers';
import vastReducer from './reducers/vastReducers';
import userReducer from './reducers/userReducers';

//setup redux devtools;
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth: authReducers,
    submission: submissionReducers,
    review: reviewReducers,
    article: articleReducer,
    vast: vastReducer,
    user: userReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
