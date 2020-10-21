
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import ToysReducer from './reducers/ToysReducer';
import ChatReducer from './reducers/ChatReducer';
import UserReducer from './reducers/UserReducer';

const rootReducer = combineReducers({
  toysApp: ToysReducer,
  chat: ChatReducer,
  user: UserReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
