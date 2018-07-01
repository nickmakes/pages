import { HttpClient } from 'mmdb-client-factory';
import { RouterState } from 'connected-react-router';

export interface ReqresCredentials {
  email: string;
  password: string;
}

export interface ReqresAccess {
  token: string;
}

export interface ReqresState {
  user?: ReqresCredentials;
  token?: string;
  error?: Error;
}

export interface AsyncContext {
  client: HttpClient;
  env: ProcessEnv;
}

export interface AppState {
  reqres: ReqresState;
  router?: RouterState;
}

export const initialAppState: AppState = {
  reqres: {}
};
