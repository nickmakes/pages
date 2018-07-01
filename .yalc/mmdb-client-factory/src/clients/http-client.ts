import { BaseMmdbClient } from './client';
import { ClientOptions, ClientType, HttpClient, HttpRequests } from '../types';

export class MmdbHttpClient extends BaseMmdbClient implements HttpClient {
  public type: ClientType.HTTP = ClientType.HTTP;

  constructor(options: ClientOptions = {}) {
    super(options);
  }

  get http(): HttpRequests {
    return this._http;
  }
}
