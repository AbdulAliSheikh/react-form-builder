import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import formListReducer from './formList/formList.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['formList'],
};

const appReducer = combineReducers({
  formList: formListReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
