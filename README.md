# Eitherify

A small utility to lift/lower a type to an Either category.

It does this by taking in a more idiomatic JavaScript function and create a partially-applied higher-order function.

The higher-order function will return any data returned from the original function as a `Success<T>` type where `T` is the data-type from the originally returned function.

## Example

Given the following function:

```ts
function _toUpperCase(str: string) {
  return str.toUpperCase();
}
```

You can apply the higher-order function like so:

```ts
const toUpperCase = eitherify(_toUpperCase);
```

Now the return type of `toUpperCase` with be `Either<string>`.

If the function succeeds, the object will look like the following:

```ts
const result = toUpperCase("string");

console.log(result);

// If success, result will look like so:
result = {
  success: true,
  data: "STRING",
};

// If an error was thrown, result will look like so:
result = {
  success: false,
  error: thrownError, // value of whatever is thrown
};
```

## Caveats

- Only supports an arity of one for any given function.
