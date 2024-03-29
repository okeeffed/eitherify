export type Success<T> = {
  success: true;
  data: T;
};

export type Failure = {
  success: false;
  error: unknown;
};

export type Either<T> = Success<T> | Failure;

export const eitherify =
  <T, R>(fn: (arg: T) => R | Promise<R>) =>
  async (arg: Either<T>): Promise<Either<R>> => {
    if (!arg.success) return arg as Either<R>;

    try {
      const result = await fn(arg.data); // Use await to handle both Promise<R> and R transparently
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  };

export function wrap<T>(data: T): Either<T> {
  return {
    success: true,
    data,
  };
}

export function unwrap<T>(e: Either<T>): T {
  // Ensure e is a Failure before throwing e.error
  if (!e.success) {
    if ("error" in e) {
      // Type guard to ensure e is a Failure
      throw e.error;
    } else {
      // Optionally handle the unexpected case where e is neither Success nor Failure
      throw new Error("Unexpected Either type");
    }
  }
  return e.data;
}
