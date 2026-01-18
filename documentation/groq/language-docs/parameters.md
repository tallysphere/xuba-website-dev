# GROQ parameters

Parameters are client-provided values that are substituted into queries before execution. Their names must begin with `$` followed by a valid identifier, and their values must be JSON literals of any type (take care to quote strings). Since they are JSON literals they can only contain values, not arbitrary GROQ expressions, and are safe to pass from user input.

For example, the following query may be given parameters such as `$type="myType"` and `$object={"title": "myTitle", "value": 3}`:

```
*[ _type == $type && title == $object.title && value > $object.value ]
```

In the HTTP API, parameters are passed via URL query parameters, see the [HTTP API documentation](/docs/http-reference/query) for details.

## Predefined Parameters

> [!WARNING]
> Gotcha
> Predefined parameters are deprecated and will be removed in a future version of the API. Please use the functions `identity()` and `now()` instead.

The following parameters are predefined and available for use in all GROQ queries:

- `$identity` (string): The ID of the current user, or `<anonymous>` for unauthenticated users.
- `$now` ([datetime](/docs/specifications/groq-data-types)): The current server time (UTC).
