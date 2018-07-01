import { HttpRequests } from './';

export enum ClientType {
  HTTP,
  // REST,
  API
}

export type MmdbClient<API = {}> = HttpClient /*| RestClient*/ | ApiClient<API>;

export interface HttpClient {
  type: ClientType.HTTP;
  http: HttpRequests;
}

// export interface RestClient {
//   type: ClientType.REST;
// }

export interface ApiClient<API> {
  type: ClientType.API;
  api: API;
}

type ApiSupplier<API> = (http: HttpRequests) => API;

export interface ClientOptions<API = {}> {
  api?: ApiSupplier<API>;
  baseUrl?: string;
  credentials?: ClientCredentials;
}

export interface ClientCredentials {
  username: string;
  password: string;
}
