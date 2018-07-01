import { ClientFactory, ClientOptions, ClientType, MmdbClient } from '../../src';

export class TestHarness<API = {}> {
  private client?: MmdbClient;

  constructor(private type: ClientType, private options: ClientOptions<API> = {}) {}

  async setup() {
    this.client = await ClientFactory.build(this.type, this.options);
  }

  async teardown() {}

  get apiClient() {
    if (this.client && this.client.type == ClientType.API) {
      return this.client;
    }
    throw new Error('cannot access api client without instantiating it first');
  }

  get httpClient() {
    if (this.client && this.client.type == ClientType.HTTP) {
      return this.client;
    }
    throw new Error('cannot access http client without instantiating it first');
  }

  // FIXME: remove me
  // get restClient() {
  //   if (this.client && this.client.type == ClientType.REST) {
  //     return this.client;
  //   }
  //   throw new Error('cannot access rest client without instantiating it first');
  // }
}
