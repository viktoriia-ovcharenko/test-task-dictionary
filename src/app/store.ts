import { combineReducers, legacy_createStore as createStore } from 'redux';
import countReducer from '../features/count';
import wordsReducer from '../features/words';

const reducer = combineReducers({
  words: wordsReducer,
  count: countReducer,
});
const store = createStore(reducer);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
