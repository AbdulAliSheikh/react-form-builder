import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import rootReducer from './root-reducer';

export const store = createStore(rootReducer,
  compose(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);
