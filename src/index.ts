export type Success<T> = {
  success: true;
  data: T;
};

export type Failure = {
  success: false;
  error: Error;
};

export type Either<T> = Success<T> | Failure;

export const eitherify =
  <T, R>(fn: (arg: T) => R) =>
  (arg: Either<T>): Either<R> => {
    if (!arg.success) return arg;

    try {
      return { success: true, data: fn(arg.data) };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  };

export function wrap<T>(data: T): Success<T> {
  return {
    success: true,
    data,
  };
}

export function unwrap<T>(e: Either<T>): T {
  if (!e.success) throw e.error;
  return e.data;
}
