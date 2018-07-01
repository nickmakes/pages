import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';

import {
  AppState,
  AsyncContext,
  ReqresCredentials,
  ReqresAccess,
  ReqresState
} from './app-state';
import { buildReducer, newAsyncActionHandler } from './util';

const reqresAction = actionCreatorFactory('reqres');
const reqresAsyncAction = asyncFactory<AppState, AsyncContext>(reqresAction);

export const login = reqresAsyncAction<ReqresCredentials, ReqresAccess>(
  'login',
  (_params, _dispatch, _getState, { client }) => client.http.get('http://reqres.in/api/login')
);

export const register = reqresAsyncAction<ReqresCredentials, ReqresAccess>(
  'register',
  (_params, _dispatch, _getState, { client }) => client.http.get('http://reqres.in/api/register')
);

export const initialReqresState: ReqresState = {};

export const reducer = buildReducer(initialReqresState, [
  newAsyncActionHandler(login.async, {
    onRequest: (state, { email, password }) => {
      state.user = { email, password };
      delete state.token;
    },
    onSuccess: (state, { result: { token } }) => {
      state.token = token;
    },
    onFailure: (state, { error }) => {
      state.error = error;
    }
  }),
  newAsyncActionHandler(register.async, {
    onRequest: (state, { email, password }) => {
      state.user = { email, password };
      delete state.token;
    },
    onSuccess: (state, { result: { token } }) => {
      state.token = token;
    },
    onFailure: (state, { error }) => {
      state.error = error;
    }
  })
]);
