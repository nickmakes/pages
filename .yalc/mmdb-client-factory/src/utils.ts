// Exhaustiveness checking - http://www.typescriptlang.org/docs/handbook/advanced-types.html
/* istanbul ignore next */
export const assertNever = (x: never) => {
    throw new Error("Unexpected object: " + x);
}

// https://stackoverflow.com/questions/30498318/es5-object-assign-equivalent
export const mergeObjects = (...args: any[]) => {
  return args.reduce((res, arg) => {
    if (arg !== undefined) {
      Object.keys(arg).forEach(key => (res[key] = arg[key]));
    }
    return res;
  }, {});
};

export const safeJoin = (delimiter: string, ...parts: string[]) =>
  parts
    .filter(part => part.trim() != '')
    .map(part =>
      part.replace(new RegExp(`/^${delimiter}/`), '').replace(new RegExp(`/${delimiter}$/`), '')
    )
    .join(delimiter);
