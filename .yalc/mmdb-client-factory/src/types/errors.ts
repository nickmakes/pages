export class MmdbClientError extends Error {
  public name: string = 'ApgError';

  constructor(
    public type: string,
    public message: string,
  ) {
    super(`${type}: ${message}`);

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}
