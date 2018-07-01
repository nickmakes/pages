import * as qs from 'query-string';
import {
  hasContentType,
  ClientOptions,
  HttpMethod,
  HttpRequestOptions,
  HttpRequests,
  MediaType,
  MmdbClientError
} from '../types';
import { /*mergeObjects, */ safeJoin } from '../utils';

export abstract class BaseMmdbClient {
  protected constructor(private options: ClientOptions) {}

  get _http(): HttpRequests {
    return {
      get: <RES = {}>(endpoint: string, options: HttpRequestOptions = {}) =>
        this._fetch<RES>(this.url(endpoint, options.params), this.args(HttpMethod.GET, options)),
      post: <RES = {}>(endpoint: string, options: HttpRequestOptions = {}) =>
        this._fetch<RES>(this.url(endpoint, options.params), this.args(HttpMethod.POST, options)),
      put: <RES = {}>(endpoint: string, options: HttpRequestOptions = {}) =>
        this._fetch<RES>(this.url(endpoint, options.params), this.args(HttpMethod.PUT, options)),
      delete: (endpoint: string) => this._fetch(this.url(endpoint), this.args(HttpMethod.DELETE))
    };
  }

  protected url(endpoint: string, queryParams?: object) {
    const { baseUrl } = this.options;
    const url = baseUrl ? safeJoin('/', baseUrl, endpoint) : endpoint;
    if (queryParams) {
      return url + qs.stringify(queryParams);
    }
    return url;
  }

  protected args(method: HttpMethod, options: HttpRequestOptions = {}): RequestInit {
    const { acceptType, body, contentType, headers = {} } = options;

    if (acceptType) {
      headers['Accept'] = acceptType;
    }
    if (contentType) {
      headers['Content-Type'] = contentType;
    }

    const credentials = options.credentials || this.options.credentials;
    if (credentials) {
      const { username, password } = credentials;
      headers['Authorization'] =
        'Basic ' + new Buffer(username + ':' + password).toString('base64');
    }

    return { method, body, headers };
  }

  private _fetch<RES>(url: string, args: RequestInit): Promise<RES> {
    const isSuccessful = (res: Response) => res.status >= 200 && res.status < 300;
    return fetch(url, args).then(res => {
      if (isSuccessful(res)) {
        if (hasContentType(res, MediaType.APPLICATION_JSON)) {
          return res.json();
        }
        if (hasContentType(res, MediaType.TEXT_PLAIN)) {
          return res.text();
        }
        return Promise.resolve(res);
      }
      if (hasContentType(res, MediaType.APPLICATION_JSON)) {
        return res.json().then(payload => Promise.reject(payload));
      }
      if (hasContentType(res, MediaType.TEXT_PLAIN)) {
        return res.text().then(payload => Promise.reject(payload));
      }
      return Promise.reject(new MmdbClientError('general', res.statusText.toLowerCase()));
    });
  }
}
