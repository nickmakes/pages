import { BaseMmdbClient } from './client';
import { ApiClient, ClientOptions, ClientType, HttpRequests, MmdbClientError } from '../types';

type ApiSupplier<API> = (http: HttpRequests) => API;

export class MmdbApiClient<API> extends BaseMmdbClient implements ApiClient<API> {
  public type: ClientType.API = ClientType.API;
  private apiSupplier: ApiSupplier<API>;

  constructor(options: ClientOptions<API> = {}) {
    super(options);

    if (!options.api) {
      throw new MmdbClientError(
        'startup',
        'must supply api in client options if instantiating an api client'
      );
    }
    this.apiSupplier = options.api;
  }

  get api(): API {
    return this.apiSupplier(this._http);
  }
}
