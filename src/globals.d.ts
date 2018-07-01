// declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
//
// declare type Constructor<T = {}> = new (...args: any[]) => T;
//
type ProcessEnv = NodeJS.ProcessEnv &
  Partial<
    {
      [key in 'DB_VERSION' | 'JS_SDK_VERSION' | 'NODE_ENV' | 'REPO_GIT_REV' | 'UI_VERSION']: string
    }
  >;
//
interface Window {
  settings: {};

  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: <R>(a: R) => R;
}
