export enum HttpMethod {
  GET = 'GET',
  // HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
  // CONNECT = 'CONNECT',
  // OPTIONS = 'OPTIONS',
  // TRACE = 'TRACE',
  // PATCH = 'PATCH',
}

export enum MediaType {
  APPLICATION_JSON = 'application/json',
  TEXT_PLAIN = 'text/plain',
  TEXT_HTML = 'text/html'
}

export const hasContentType = (res: Response, type: MediaType) =>
  (res.headers.get('Content-Type') || '').split(';').indexOf(type) >= 0;

export interface HttpRequestOptions {
  acceptType?: MediaType;
  body?: string;
  contentType?: MediaType;
  cors?: boolean;
  credentials?: {
    username: string;
    password: string;
  };
  headers?: { [k: string]: string };
  params?: object;
}

export interface HttpRequests {
  get: HttpRequest;
  post: HttpRequest;
  put: HttpRequest;
  delete: HttpRequest;
}

export type HttpRequest = <RES>(endpoint: string, options?: HttpRequestOptions) => Promise<RES>;

export interface HttpRequestFactory {
  get: HttpRequest;
  post: HttpRequest;
  put: HttpRequest;
  delete: HttpRequest;
}

// export type ApiRequest = <RES>(resource: string, options: object) => Promise<RES>;
//
// export type HttpRequest = (endpoint: string, options: object) => Promise<Response>;
