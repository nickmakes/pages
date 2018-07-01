// import { BaseMmdbClient } from './client';
// import { ClientOptions, ClientType, HttpRequest, RestClient } from '../types';
// import { assertNever } from '../utils';
//
// type Partial<T> = { [P in keyof T]?: T[P] };
//
// interface Request {
//   [key: string]: Partial<RestResource>;
// }
//
// interface RestResource {
//   path: string;
//   pluralPath: string;
//   complex: boolean;
//   actions: RestActionType[];
// }
//
// enum RestActionType {
//   LIST,
//   COUNT,
//   CREATE,
//   CLEAR,
//   GET,
//   EXISTS,
//   UPDATE,
//   REMOVE
// }
//
// type RestEndpoints<REST> = {
//   [key in keyof REST]?: () => {
//     list: () => HttpRequest;
//     count: HttpRequest;
//     create: HttpRequest;
//     clear: HttpRequest;
//     [key: string]: (
//       arg: string
//     ) => {
//       get: HttpRequest;
//       exists: HttpRequest;
//       update: HttpRequest;
//       remove: HttpRequest;
//     };
//   }
// };
//
// export class MmdbRestClient<REST extends Request> extends BaseMmdbClient implements RestClient {
//   public type: ClientType.REST = ClientType.REST;
//
//   constructor(private request: Request, options: ClientOptions = {}) {
//     super(options);
//   }
//
//   get rest(): RestEndpoints<REST> {
//     const initialEndpoints: RestEndpoints<REST> = {};
//     return Object.keys(this.request).reduce((rest, resourceName) => {
//       const { path, pluralPath, complex, actions } = this.request[resourceName];
//       const resource = {
//         path: path || resourceName,
//         pluralPath: pluralPath || resourceName + 's',
//         complex: complex || false,
//         actions
//       };
//       // rest[resourceName] = this.request[resource].path || resource;
//       const resourceRest;
//       return rest;
//     }, initialEndpoints);
//   }
//
//   private doRestAction(resource: RestResource, type: RestActionType) {
//     const url;
//     switch (type) {
//       case LIST:
//         return this._get;
//       default:
//         assertNever(type);
//     }
//   }
//
//   private resourceUrl(resource: RestResource, type: RestActionType) {
//     switch (type) {
//       case RestActionType.LIST:
//       case RestActionType.COUNT:
//       case RestActionType.CREATE:
//       case RestActionType.CLEAR:
//         return this.url(resource.pluralPath);
//       default:
//         assertNever(type);
//     }
//   }
// }
