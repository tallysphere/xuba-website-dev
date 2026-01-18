# GROQ and GraphQL

Sanity's primary API for querying is GROQ, but we also offer a [GraphQL API](/docs/content-lake/graphql). Here we look at both of them and how they compare.

[Check out the GraphQL API](/docs/content-lake/graphql)

[GraphQL](http://graphql.org/) is a pattern for designing flexible APIs to structured, connected data. GraphQL is very popular, and there are loads of nice tooling and libraries for it appearing every week. Naturally, we are often asked why we did not design Sanity with GraphQL as the core query language, but rather added it as a mapper.

Take this GROQ-query:

```text
*[_type == "author" && name match "Edgar" && debutYear < 1900]{
  name,
  debutYear
}
```

(Fetch authors, whose name contains the string "Edgar" and debuted before 1900, return the name, year of debut, and the number of books for each author. The results would perhaps include `{"name": "Edgar Allan Poe", "debutYear": 1827}`)

Using our GraphQL mapper you would express it like his:

```text
{
  authors(where: {
      debutedBefore_lt: "1900-01-01T00:00:00Z",
      name_matches: "Edgar*"
  ) {
    name,
    debutYear,
  }
}
```

This is just one example. We see a lot of different uses of Sanity. Some people prefer GraphQL so they can tie the API to other services and enjoy the tooling of the GraphQL ecosystem.

Sometimes they run up against what you can reasonably express in the built-in GraphQL mapper and build their own APIs. Then it's really good to have GROQ with its free form queries that translate well to GraphQL.

Others simply prefer GROQ for its expressive range and what you can accomplish without any configuration whatsoever.

## What about mutations?

GraphQL mutations are not currently supported. You can learn more about [how to mutate and patch data here](/docs/http-reference/mutation).
