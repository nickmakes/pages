import { assertNever, ClientOptions, ClientType, MmdbClient, MmdbClientError } from '../';
import { MmdbApiClient, MmdbHttpClient /*, MmdbRestClient*/ } from './';

export class ClientFactory {
  constructor() {
    throw new MmdbClientError(
      'startup',
      'client factory cannot be instantiated, use the static build method instead'
    );
  }

  static buildApi<API = {}>(options: ClientOptions<API> = {}): Promise<MmdbApiClient<API>> {
    return ClientFactory.build(ClientType.API, options).then(client => <MmdbApiClient<API>>client);
  }

  static buildHttp(options: ClientOptions = {}): Promise<MmdbHttpClient> {
    return ClientFactory.build(ClientType.HTTP, options).then(client => <MmdbHttpClient>client);
  }

  // FIXME: remove me
  // static buildRest(options: ClientOptions = {}): Promise<MmdbRestClient> {
  //   return ClientFactory.build(ClientType.REST, options).then(client => <MmdbRestClient>client);
  // }

  static build<API = {}>(type: ClientType, options: ClientOptions<API> = {}): Promise<MmdbClient> {
    let client: MmdbClient;
    switch (type) {
      case ClientType.API:
        client = new MmdbApiClient<API>(options);
        break;
      case ClientType.HTTP:
        client = new MmdbHttpClient(options);
        break;
      // case ClientType.REST:
      //   client = new MmdbRestClient(options);
      //   break;
      default:
        return assertNever(type);
    }
    return Promise.resolve(client);
  }
}
