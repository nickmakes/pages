import { combineReducers, Reducer } from 'redux';

import { AppState } from './app-state';
import { reducer as reqresReducer } from './reqres';

export const reducers: Reducer<AppState> = combineReducers({
  reqres: reqresReducer
});
