GROQ
Current Working Draft

This is the specification for GROQ (Graph-Relational Object Queries), a query language and execution engine made at Sanity, Inc, for filtering and projecting JSON documents. The work started in 2015. The development of this open standard started in 2019.

GROQ is authored by Alexander Staubo and Simen Svale Skogsrud. Additional follow up work by Erik Grinaker, Magnus Holm, Radhe, Israel Roldan, Sindre Gulseth, Matt Craig, Espen Hovlandsdal, Tonina Zhelyazkova.

This specification should be considered work in progress until the first release.

Copyright notice
Copyright © 2015–present, Sanity, Inc.

As of July 9, 2010, the following persons or entities have made this Specification available under the Open Web Foundation Final Specification Agreement (OWFa 1.0), which is available at openwebfoundation.org.

Sanity, Inc.
You can review the signed copies of the Open Web Foundation Final Specification Agreement Version 1.0 for this specification at github.com/sanity-io/GROQ, which may also include additional parties to those listed above.

Your use of this Specification may be subject to other third party rights. THIS SPECIFICATION IS PROVIDED “AS IS.” The contributors expressly disclaim any warranties (express, implied, or otherwise), including implied warranties of merchantability, non‐infringement, fitness for a particular purpose, or title, related to the Specification. The entire risk as to implementing or otherwise using the Specification is assumed by the Specification implementer and user. IN NO EVENT WILL ANY PARTY BE LIABLE TO ANY OTHER PARTY FOR LOST PROFITS OR ANY FORM OF INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY CHARACTER FROM ANY CAUSES OF ACTION OF ANY KIND WITH RESPECT TO THIS SPECIFICATION OR ITS GOVERNING AGREEMENT, WHETHER BASED ON BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE, AND WHETHER OR NOT THE OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Conformance
A conforming implementation of GROQ must fulfill all normative requirements. Conformance requirements are described in this document via both descriptive assertions and key words with clearly defined meanings.

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative portions of this document are to be interpreted as described in IETF RFC 2119. These key words may appear in lowercase and still retain their meaning unless explicitly declared as non‐normative.

A conforming implementation of GROQ may provide additional functionality, but must not where explicitly disallowed or would otherwise result in non‐conformance.

Conforming Algorithms
Algorithm steps phrased in imperative grammar (e.g. “Return the result”) are to be interpreted with the same level of requirement as the algorithm it is contained within. Any algorithm referenced within an algorithm step (e.g. “Let completedResult be the result of calling CompleteValue()”) is to be interpreted as having at least the same level of requirement as the algorithm containing that step.

Conformance requirements expressed as algorithms can be fulfilled by an implementation of this specification in any way as long as the perceived result is equivalent. Algorithms described in this document are written to be easy to understand. Implementers are encouraged to include equivalent but optimized implementations.

Contents
1Overview
2Syntax
2.1JSON Superset
2.2White Space
2.3Comments
2.4Identifier
2.5Digits
2.6Expression
2.7Selector
3Execution
3.1Overview
3.2Mode
3.3Query context
3.4Scope
3.5Expression validation
3.6Query validation
3.7Expression evaluation
3.8Constant expression evaluation
3.9Score evaluation
3.10Selector evaluation
3.11Traversal execution
3.11.1Combining traversal
3.11.2Plain traversal
3.11.3Array traversals
3.11.4Array source traversals
3.11.5Array target traversals
3.12Query execution
4Data types
4.1Null
4.2Boolean
4.3Number
4.4String
4.5Array
4.6Object
4.7Pair
4.8Range
4.9Datetime
5Equality and comparison
5.1Equality
5.2Partial comparison
5.3Total comparison
6Simple expressions
6.1This expression
6.2This attribute expression
6.3Everything expression
6.4Parent expression
6.5Parameter expression
6.6Function call expression
7Compound expressions
7.1Parenthesis expression
7.2Traversal expression
7.3Pipe function call expression
8Traversal operators
8.1Attribute access traversal
8.2Element access traversal
8.3Slice traversal
8.4Filter traversal
8.5Array postfix traversal
8.6Projection traversal
8.7Dereference traversal
8.8Disambiguating square bracket traversal
9Operators
9.1And operator
9.2Or operator
9.3Not operator
9.4Equality operators
9.5Comparison operators
9.6In operator
9.7Match operator
9.8Asc operator
9.9Desc operator
9.10Unary plus operator
9.11Unary minus operator
9.12Binary plus operator
9.13Binary minus operator
9.14Binary star operator
9.15Binary slash operator
9.16Binary percent operator
9.17Binary double star operator
10Precedence and associativity
11Functions
11.1Global namespace
11.1.1global::after()
11.1.2global::before()
11.1.3global::coalesce()
11.1.4global::count()
11.1.5global::dateTime()
11.1.6global::defined()
11.1.7global::length()
11.1.8global::now()
11.1.9global::references()
11.1.10global::round()
11.1.11global::select()
11.1.12global::string()
11.1.13global::boost()
11.1.14global::lower()
11.1.15global::upper()
11.2Date/time namespace
11.2.1dateTime::now()
11.3Diff namespace
11.3.1diff::changedAny()
11.3.2diff::changedOnly()
11.4Delta namespace
11.4.1delta::changedAny
11.4.2delta::changedOnly
11.4.3delta::operation()
11.5Array namespace
11.5.1array::join()
11.5.2array::compact()
11.5.3array::unique()
11.5.4array::intersects()
11.6String namespace
11.6.1string::split()
11.6.2string::startsWith()
11.7Math namespace
11.7.1math::sum()
11.7.2math::avg()
11.7.3math::min()
11.7.4math::max()
12Custom Functions
12.1Function Definition
12.2Function invocation
13Pipe functions
13.1global::order()
13.2global::score()
14Vendor functions
14.1global::identity()
14.2global::path()
15Extensions
15.1Portable Text Extension
15.1.1pt type
15.1.2global::pt()
15.1.3pt::text()
15.2Geography Extension
15.2.1geo type
15.2.2global::geo()
15.2.3geo::latLng()
15.2.4geo::contains()
15.2.5geo::intersects()
15.2.6geo::distance()
§Index
1Overview
GROQ (Graph-Relational Object Queries) is a declarative language designed to query collections of largely schema-less JSON documents. Its primary design goals are expressive filtering, joining of several documents into a single response, and shaping the response to fit the client application.

The idea behind GROQ is to be able to describe exactly what information your application needs, potentially joining together information from several sets of documents, then stitching together a very specific response with only the exact fields you need.

A query in GROQ typically starts with \*. This asterisk represents every document in your dataset. It is typically followed by a filter in brackets. The filter take terms, operators and functions. A projection is wrapped in curly braces and describe the data as we want it returned.

Given these JSON documents:

{ "id": 1, "name": "Peter"}
{ "id": 2, "name": "Gamora"}
{ "id": 3, "name": "Drax"}
{ "id": 4, "name": "Groot"}
{ "id": 5, "name": "Rocket"}
The following query:

\*[id > 2]{name}
Will result in the following JSON document:

[
{ "name": "Drax"},
{ "name": "Groot"},
{ "name": "Rocket"}
]
2Syntax
A GROQ query is a string consisting of Unicode characters. The encoding of the query string is implementation-defined, but UTF-8 is the preferred choice.

SourceCharacter
any Unicode character
A query consist of a single Expression optionally preceded by a list of FuncDecl, with WhiteSpace and Comment allowed anywhere with no effect on the interpretation.

Query
FuncDecllistoptExpression
2.1JSON Superset
GROQ’s syntax is a superset of JSON, so any valid JSON value is a valid GROQ expression (that simply returns the given value). Below are a few examples of JSON values:

"Hi! 👋"
["An", "array", "of", "strings"]
{
"array": ["string", 3.14, true, null],
"boolean": true,
"number": 3.14,
"null": null,
"object": {"key": "value"},
"string": "Hi! 👋"
}
2.2White Space
Whitespace is not significant in GROQ, except for acting as a token separator and comment terminator. Any sequence of the following characters is considered whitespace.

WhiteSpace
Tab U+0009
Newline U+000A
Vertical tab U+000B
Form feed U+000C
Carriage return U+000D
Space U+0020
Next line U+0085
Non-breaking space U+00A0
Whitespace inside a string literal is interpreted as-is.

2.3Comments
Comment
//CommentCharlistopt
CommentChar
SourceCharacterNewline U+000A
Comments serve as query documentation, and are ignored by the parser. They start with // and run to the end of the line:

{
// Comments can be on a separate line
"key": "value" // Or at the end of a line
}
Comments cannot start inside a string literal.

{
"key // This isn't a comment": "value"
}
2.4Identifier
Identifiers are used to name entities such as parameters, attributes and functions. An identifier is a sequence of one or more letters and digits. The first character in an identifier must be a letter.

Identifier
/[A-Za-z\_][A-Za-z_0-9]\*/
2.5Digits
GROQ uses decimal digits (0-9) and hexadecimal digits (0-9, a-f) in various places.

Digit
0 1 2 3 4 5 6 7 8 9
HexDigit
Digit
HexLetter
HexLetter
a A b B c C d D e E f F
2.6Expression
An Expression is either a literal (e.g. 15), a simple expression (e.g. @), or a compound expression (e.g. \*[name == "Michael"]) or an operator call (e.g. name == "Michael"). The syntax and semantics of the different expressions are documented in their respective sections.

Expression
Literal
SimpleExpression
CompoundExpression
OperatorCall
Literal
Null
Boolean
Number
String
Array
Object
SimpleExpression
This
ThisAttribute
Everything
Parent
Parameter
FuncCall
CompoundExpression
Parenthesis
TraversalExpression
PipeFuncCall
OperatorCall
And
Or
Not
Equality
Comparison
In
Match
Asc
Desc
UnaryPlus
UnaryMinus
Plus
Minus
Star
Slash
Percent
StarStar
2.7Selector
A selector is a subset of an expression used to search for fields inside a document. They have their own evaluation logic (see EvaluateSelector()) which is used by certain functions.

Selector
ThisAttribute
SelectorGroup
SelectorTuple
SelectorAttributeAccess
SelectorArrayPostfix
SelectorFilter
Selector.SelectorGroup
Selector.SelectorTuple
SelectorGroup
(Selector)
SelectorTuple
(SelectorSelectorTuplePartlist)
SelectorTuplePart
,Selector
3Execution
3.1Overview
The following sub-section is a non-normative overview of the execution model. See the rest of the section for the exact semantics.
A GROQ query is executed inside a query context, which contains the dataset and parameters, and returns a result. Typically the result is serialized to JSON. During the execution of a query different parts of the query are evaluated in different scopes. Each scope has a this value and can be nested. Simple attributes like name always refers to an attribute on the this value.

\*[_type == "person"]{name, friends[country == "NO"]}
In the preceding example we have several scopes:

The first filter ([_type == "person"]) creates a new scope for every document in the dataset. An equivalent scope is created inside the projection ({name, …}).
The country filter ([country == "NO"]) creates a new scope for each element in the friends array.
The parent expression (^) let’s you refer to parent scopes, and this enables what is typically solved with joins in many databases.

_[_type == "person"]{
id,
name,
"children": _[_type == "person" && parentId == ^.id]
}
While executing the inner filter ([_type == "person" && parentId == ^.id]) the expression ^.id returns the id attribute of the parent scope’s this value. The parent scope is here the scope created by the projection ({id, name, …}).

It’s possible for a query to be invalid. This can happen when you e.g. use an unknown function or call a function with incorrect number of arguments.

3.2Mode
Queries can be executed in two different modes: normal and delta. Delta mode is intended to be used in case where a change has been done to a document. In this mode you have the additional functionality of accessing the attributes before and after the change, and comparing the differences between them (using the functions in the delta-namespace).

3.3Query context
A query context consists of:

the dataset
parameter values (map from string to value)
the mode: either “normal” or “delta”
custom function definitions (map from string to function)
If the mode is “delta” then the query context also has:

a before object (which is null if this was a create-operation).
an after object (which is null if this was a delete-operation).
3.4Scope
A scope consists of:

a this value
an optional parent scope
a query context
a map of parameters
A root scope can be constructed from a query context, and a nested scope can be constructed from an existing scope.

NewNestedScope(value, scope)
Let newScope be a new scope.
Set the this value of newScope to value.
Set the parent scope of newScope to scope.
Set the query context of newScope to the query context of scope.
Set the parameters of newScope to the parameter of scope.
Return newScope.
NewRootScope(context)
Let newScope be a new scope.
Set the this value of newScope to null.
Set the parent scope of newScope to null.
Set the query context of newScope to context.
Set the parameters to the parameters given to the query request.
Return newScope.
3.5Expression validation
An expression can be validated. This will only check that it’s on a valid form, and will not execute anything. If an expression type does not have an explicitly defined validator in this specification, it has an implicit validator which runs Validate on all its child expressions.

Validate(expr)
Let validator be the validator of expr.
Execute the validator.
3.6Query validation
A query is validated by first validating the custom functions and then validating the expression. Custom functions are validated by validating the function bodies.

3.7Expression evaluation
An expression is evaluated in a scope. You must successfully validate an expression before you attempt to evaluate it. Every expression type has their own evaluator function in their respective section in this specification (e.g. the evaluator of ParenthesisExpression is EvaluateParenthesis()).

Evaluate(expr, scope)
Let evaluator be the evaluator of expr.
Return the result of evaluator(scope).
3.8Constant expression evaluation
Some expressions can be evaluated into a constant value. This is used for validation and to disambiguate between different syntactically ambiguous expressions.

ConstantEvaluate(expr)
If expr is one of: Literal, Parenthesis, Plus, Minus, Star, Slash, Percent, StarStar, UnaryPlus, UnaryMinus.
Let evaluator be the evaluator of expr.
Let result be the result of executing evaluator, but using ConstantEvaluate() in-place of every Evaluate().
Return the result.
Otherwise: Report an error.
3.9Score evaluation
When evaluating score, a predicate returning true should have its score computed as 1.0, and all other values should receive a score of 0.0. All results involved in scoring start with a score of 1.0. The scores are evaluated once per result, and then added together. For example:

- | score(a > 1)
  should assign a score of 2.0 to any document where a > 1, and a score of 1.0 to any non-matching document.

For logical expressions, the score is the sum of the clauses of the expression evaluates to true, otherwise 0.0. In other words:

true && false receives the score 0.0.
true && true receives the score 2.0.
true || true receives the score 2.0.
true || false receives the score 1.0.
The scoring function for match is left as an implementation detail and not covered by this specification. For example, an implementation may choose to use a TF/IDF or similar text scoring function that uses the text corpus and language configuration for the given field to compute a text score.

A boosted predicate simply adds the boost value to the score if the predicate matches. For example, boost(a > 1, 10) would result in a score of 11 for any expression matching a > 1.

3.10Selector evaluation
A selector (see Selector) is evaluated in a scope with a value and returns a list of key paths. A key path uniquely identifies a value by the attribute names and array indices used to access the value. For instance, the key path .users[1].name refers to the "Bob"-value in {"users":[{"name":"Alice"},{"name":"Bob"}]}.

EvaluateSelector(selector, value, scope)
If selector is a SelectorGroup:
Let inner be the inner selector.
Return EvaluateSelector(inner, value).
Let result be an empty list of key paths.
If selector is a SelectorTuple:
For each selector inner in the tuple:
Let innerResult be the result of EvaluateSelector(inner, value, scope).
Concatenate innerResult to result.
If selector is a ThisAttibute:
If value is an object which has the given attribute:
Let keyPath be a new key path consisting of the attribute name.
Append keyPath to result.
If selector starts with a Selector:
Let baseSelector be the selector.
Let base be the result of EvaluateSelector(baseSelector, value, scope).
For each keyPath in base:
Let innerValue be the value at keyPath in value.
If selector ends with a ArrayPostfix:
If innerValue is an array:
For each item in innerValue:
Let nestedKeyPath be the result of combining keyPath with the array index.
Append nestedKeyPath to result.
If selector ends with a AttributeAccess:
If innerValue is an object which has the given attribute:
Let nestedKeyPath be the result of combining keyPath with the attribute name.
Append nestedKeyPath to result.
If selector ends with a Filter:
If innerValue is an array:
For each item of innerValue:
Let nestedScope be the result of NewNestedScope(value, scope).
Let matched be the result of Evaluate(expr, nestedScope).
If matched is true:
Let nestedKeyPath be the result of combining keyPath with the array index.
Append nestedKeyPath to result.
If selector ends with a SelectorGroup:
Let inner be that selector.
Let innerResult be the result of EvaluateSelector(inner, innerValue, scope).
For each nestedKeyPath in innerResult:
Let combinedKeyPath be the result of combining keyPath with nestedKeyPath.
Append combinedKeyPath to result.
If selector ends with a SelectorTuple:
For each selector inner in the tuple:
Let innerResult be the result of EvaluateSelector(inner, innerValue, scope).
For each nestedKeyPath in innerResult:
Let combinedKeyPath be the result of combining keyPath with nestedKeyPath.
Append combinedKeyPath to result.
Return result.
3.11Traversal execution
When working with JSON values you often need to access attributes in deeply nested arrays/objects. In JavaScript this is solved by using helper functions such as map, filter and flatMap. GROQ provides terse syntax for accomplishing the same functionality.

// The following GROQ: \*[_type == "user"].\_id

// is equivalent to the following JavaScript:
data.filter(u => u.\_type == "user").map(u => u.\_id)
The following expressions are implemented as a traversal:

user.name: AttributeAccess.
image->: Dereference.
users[0]: ElementAccess.
users[0...5]: Slice.
users[type == "admin"]: Filter.
users[]: ArrayPostfix.
user{name}: Projection.
When these traversals are combined (e.g. user.roles[0].permissions[priority > 2]{filter}) it triggers a separate traversal logic.

Informally the traversal logic is based on a few principles:

Traversal semantics are always statically known. The runtime value of an expression never impacts the overall interpretation of a traversal.
We categorize traversals into four types (plain, array, array source, array target) based on how they work on arrays. .user.name is considered a plain traversal because it statically only deals with plain values. [_type == "user"] is considered an array traversal because it works on arrays.
Placing a plain traversal next to an array traversals ([_type == "user"].name.firstName) will execute the plain traversal for each element of the array.
Formally the semantics are specified as follows:

Each traversal has a traverse function which describes how it will traverse a value. This function takes a value and a scope as parameters.
There’s a set of traversal combination functions which specifies how two traversals can be combined. This explains exactly how .user.name is mapped over each element of an array.
TraversalPlain, TraversalArray, TraversalArraySource, TraversalArrayTarget specifies the exact rules for how multiple traversals are combined together.
The TraversalExpression node is an Expression for the full set of traversal operators. This kicks off the whole traversal semantics.
3.11.1Combining traversal
Multiple traversals are combined in four different ways:

Joined: In .user.name we want to execute the first traversal (.user), and then apply the second traversal (.name) on the result. This is specified by the EvaluateTraversalJoin() function.
Mapped: In [_type == "user"].id we want to execute the first traversal ([_type == "user"]), and then apply the second traversal (.id) for each element of the array. This is specified by the EvaluateTraversalMap() function.
Flat-mapped: In [_type == "user"].names[] we want to execute the first traversal ([_type == "user"]), and then apply the second traversal (.names[]) for each element of the array, and then flatten the result. This is specified by the EvaluateTraversalFlatMap() function.
Inner mapped: In {name,type}[type == "admin"] we want to execute the first traversal ({name,type}) for each element of the array, and then apply the second traversal ([type == "admin"]) on the full array. This is specified by the EvaluateTraversalInnerMap() function.
Unless otherwise specified, any two traversal are combined using the EvaluateTraversalJoin() function.

EvaluateTraversalJoin(base, scope)
Let traverse be the traverse function of the first node.
Let nextTraverse be the traverse function of the last node.
Let result to be the result of traverse(base, scope).
Set result to be the result of nextTraverse(result, scope).
Return result.
EvaluateTraversalMap(base, scope)
Let traverse be the traverse function of the first node.
Let nextTraverse be the traverse function of the last node.
Set base to be the result of traverse(base, scope).
If base is not an array:
Return null.
Let result be an empty array.
For each value in base:
Let elem be the result of nextTraverse(value, scope).
Append elem to result.
Return result.
EvaluateTraversalFlatMap(base, scope)
Let traverse be the traverse function of the first node.
Let nextTraverse be the traverse function of the last node.
Set base to be the result of traverse(base, scope).
If base is not an array:
Return null.
Let result be an empty array.
For each value in base:
Let elem be the result of nextTraverse(value, scope).
If elem is an array:
Concatenate elem to result.
Return result.
EvaluateTraversalInnerMap(base, scope)
Let traverse be the traverse function of the first node.
Let nextTraverse be the traverse function of the last node.
If base is not an array:
Return null.
Let result be an empty array.
For each value in base:
Let elem be the result of traverse(value, scope).
Append elem to result.
Set result to be the result of nextResult(base, scope).
Return result.
3.11.2Plain traversal
A plain traversal is a traversal which works on and returns unknown types.

.user.name
.users[0].name
.image->{url}
The following are not considered plain traversals:

[_type == "user"].name (because it works on an array)
.users[] (because it returns an array)
BasicTraversalPlain
AttributeAccess
Dereference
TraversalPlain
BasicTraversalPlain
BasicTraversalPlainTraversalPlain
BasicTraversalPlainTraversalArraySource
Projection
ProjectionTraversalPlain
3.11.3Array traversals
An array traversal is a traversal which statically is known to works on and return an array:

[_type == "user"].id
[_type == "user"].names[]
{name,type}[type == "admin"]
The following are not considered array traversals:

[_type == "user"].roles[0] (because it returns an unknown type)
.names[] (because it works on a non-array)
BasicTraversalArray
Slice
Filter
ArrayPostfix
TraversalArray
BasicTraversalArray
BasicTraversalArrayTraversalArray
ElementAccessTraversalArray
ElementAccessTraversalArrayTarget
BasicTraversalArrayTraversalPlain(Evaluated using EvaluateTraversalMap)
BasicTraversalArrayTraversalArrayTarget(Evaluated using EvaluateTraversalFlatMap)
ProjectionTraversalArray(Evaluated using EvaluateTraversalInnerMap)
3.11.4Array source traversals
An array source traversal is a traversal which statically is known to work on an array, but returns an unknown type:

[0].user.name
[_type == "user"].roles[0]
{name,type}[0]
The following are not considered array source traversals:

[_type == "user"].id (because it returns an array)
.user.name (because it doesn’t work on an array)
TraversalArraySource
ElementAccess
ElementAccessTraversalArraySource
ElementAccessTraversalPlain
BasicTraversalArrayTraversalArraySource
ProjectionTraversalArraySource(Evaluated using EvaluateTraversalInnerMap)
3.11.5Array target traversals
An array target traversal is a traversal which statically is known to return on an array, but works on an unknown type:

user.roles[dataset == "production"]
{name,type}[]
The following are not considered array source traversals:

[_type == "user"].id (because it also works on an array)
.user.name (because it doesn’t work on an array)
TraversalArrayTarget
BasicTraversalPlainTraversalArray
BasicTraversalPlainTraversalArrayTarget
ProjectionTraversalArrayTarget
3.12Query execution
To execute a query you must first construct a query context, and then evaluate the query expression inside a root scope.

ExecuteQuery(query, context)
Let scope be the result of NewRootScope(context).
Let expr be the expression of query.
Let result be the result of Evalute(expr, scope).
Return result.
4Data types
4.1Null
An unknown value, expressed as null. This follows the SQL definition of null, which differs from the typical definition of “no value” in programming languages, and implies among other things that 1 + null yields null (1 plus an unknown number yields an unknown number).

Null
null
4.2Boolean
Logical truth values, i.e. true and false.

Boolean
true
false
4.3Number
Signed 64-bit double-precision floating point numbers, e.g. 3.14, following the IEEE 754 standard. These have a magnitude of roughly 10⁻³⁰⁷ to 10³⁰⁸, and can represent 15 significant figures with exact precision – beyond this, significant figures are rounded to 53-bit precision. The special IEEE 754 values of Infinity and NaN are not supported, and are coerced to null.

Number
Integer
Decimal
ScientificNotation
Sign

- - Integer
    SignoptDigitlist
    Decimal
    SignoptDigitlistFractional
    ScientificNotation
    SignoptDigitlistFractionaloptExponentMarkerSignoptDigitlist
    Fractional
    .Digitlist
    ExponentMarker
    e E
    4.4String
    A string stores an UTF-8 encoded list of characters.

The syntax of a string literal is a subset of JSON with the following extensions:

Any control characters (including newlines) are allowed to appear inside a string.
Extended support for referring to Unicode characters above 16-bit: "\u{1F600}".
String
"DoubleStringCharacterlistopt"
'SingleStringCharacterlistopt'
DoubleStringCharacter
SourceCharacter"\
\EscapeSequence
SingleStringCharacter
SourceCharacter'\
\EscapeSequence
EscapeSequence
SingleEscapeSequence
UnicodeEscapeSequence
SingleEscapeSequence
' " \ / b f n r t
UnicodeEscapeSequence
uHexDigitHexDigitHexDigitHexDigit
u{HexDigitlist}
Escape sequences are interpreted as follows:

\' represents U+0027.
\" represents U+0022.
\\ represents U+005C.
\/ represents U+002F.
\b represents U+0008.
\f represents U+000C.
\n represents U+000A.
\r represents U+000D.
\t represents U+0009.
\uXXXX represents the Unicode code point U+XXXX.
\uXXXX\uYYYY, where XXXX is a high surrogate (W1, 0xD800–0xDBFF) and YYYY is a low surrogate (W2, 0xDC00–0xDFFF) is interpreted as a UTF-16 surrogate pair and encoded into a single code point.
It’s a syntactical error when a Unicode escape sequence represents an invalid Unicode code point.

4.5Array
An ordered collection of values, e.g. [1, 2, 3]. Can contain any combination of other types, including other arrays and mixed types. An element inside an array literal can be preceded by ... which causes it to be flattened into the array.

Array
[ArrayElementsopt,opt]
ArrayElements
ArrayElement
ArrayElements,ArrayElement
ArrayElement
...optExpression
EvaluateArray(scope)
Let result be a new empty array.
For each ArrayElement:
Let elementNode be the Expression of the ArrayElement.
Let element be the result of Evaluate(elementNode, scope).
If the ArrayElement contains ...:
If element is an array:
Concatenate element to result.
Otherwise:
Append element to result.
Return result.
4.6Object
An unordered collection of key/value pairs (referred to as attributes) with unique keys, e.g. {"a": 1, "b": 2}. Keys must be strings, while values can be any combination of other types, including other objects. If duplicate keys are specified, the last key is used.

The values of an object literal can use the full power of expressions:

_[_type == "rect"]{"area": width _ height}
A Projection expression is just an expression with an object literal to the right of it.
Object literal supports syntactical sugar when the attribute name and value is equivalent:

// These two are equivalent
_[_type == "person"]{name}
_[_type == "person"]{"name": name}
Object
{ObjectAttributesopt,opt}
ObjectAttributes
ObjectAttribute
ObjectAttributes,ObjectAttribute
ObjectAttribute
String:Expression
Expression
...Expressionopt
EvaluateObject(scope)
Let result be a new empty object.
For each ObjectAttribute:
If the ObjectAttribute contains ...:
If the ObjectAttribute contains an Expression:
Let baseNode be the Expression.
Let base be the result of Evaluate(baseNode, scope).
Otherwise:
Let base be the this value of scope.
For each name and value of base:
Set the attribute name to value in result.
Otherwise:
Let valueNode be the Expression of the ObjectAttribute.
Let value be the result of Evaluate(valueNode, scope).
If the ObjectAttribute contains a String:
Let name be the string value of the String.
Otherwise:
Let name be the result of DetermineName(valueNode).
Set the attribute name to value in result.
Return result.
DetermineName(node)
If node is an ThisAttribute:
Return the string value of the Identifier of node.
If node is a ArrayPostfix, Dereference, ElementAccess, Filter, Map, Projection, SelectorGroup, or Slice:
Let base be the first Expression of expr.
Return the result of DetermineName(base).
ValidateObject()
For each ObjectAttribute:
If the ObjectAttribute does not contain a String:
Let expr be the Expression.
Execute ValidateObjectAttribute(expr).
ValidateObjectAttribute(expr)
If node is an ThisAttribute:
Stop.
If node is a Projection, ElementAccess, Slice, or Filter:
Let base be the first Expression of expr.
Execute ValidateObjectAttribute(base).
Otherwise:
Report an error.
4.7Pair
A pair of values, e.g. "a" => 1. Pairs can contain any combination of other types, including other pairs, and are mainly used internally with e.g. projection conditionals andselect().

In serialized JSON, pairs are represented as a string on the form fst => snd where fst and snd are the serialized JSON for the first and the second expression.

Pair
Expression=>Expression
EvaluatePair(scope)
Let firstNode be the first Expression.
Let secondNode be the second Expression.
Let result be a new pair.
Set the first value of result to the result of Evaluate(firstNode, scope).
Set the second value of result to the result of Evaluate(secondNode, scope).
Return result.
4.8Range
An interval containing all values that are ordered between the start and end values. The starting value is always included, while the end may be either included or excluded. A right-inclusive range is expressed as two values separated by .., e.g. 1..3, while a right-exclusive range is separated by ..., e.g. 1...3.

Ranges can have endpoints of any comparable data type, but both endpoints must be of the same type (except integers and floats which can be used interchangeably). Ranges with incompatible or invalid endpoints types will yield null.

Ranges are mainly used internally, e.g. with the in operator and array slice access operator. The endpoints may have context-dependent semantics, e.g. in array slices the range [2..-1] will cover the range from the third array element to the last element, while the same range is considered empty when used with in. For more details, see the documentation for the relevant operators.

In serialized JSON, ranges are represented as a string on the form start..end (for inclusive ranges) and start...end (for exclusive ranges) where start and end are the serialized JSON for the start and the end expression.

Range
InclusiveRange
ExclusiveRange
InclusiveRange
Expression..Expression
ExclusiveRange
Expression...Expression
EvaluateRange(scope)
Let startNode be the first Expression.
Let endNode be the second Expression.
Let start be the result of Evaluate(startNode, scope).
Let end be the result of Evaluate(endNode, scope).
If PartialCompare(start, end) is null:
Return null.
Let result be a new range.
Set the start value of result to start.
Set the end value of result to end.
Mark the range as inclusive or exclusive.
Return result.
4.9Datetime
A datetime is a combination of a Gregorian-calendar date and a time in UTC. It’s stored in millisecond precision, but an implementation can choose to support even finer granularity. Datetimes support date/time arithmetic. Only valid date/time combinations can be represented.

Datetimes cannot be constructed from literals, but must be constructed with the dateTime function.

In serialized JSON, datetimes are represented as a string with using RFC 3339 timestamp format, e.g. 2006-01-02T15:04:05Z using the following rules:

If there is no millisecond information in the datetime, format it without any fractional digits: 2006-01-02T15:04:05Z
If there is millisecond information in the datetime, format it with 3 fractional digits: 2006-01-02T15:04:05.508Z
If the datetime contains even finer granularity, it’s implementation dependent how the additional fractional digits are formatted.
5Equality and comparison
GROQ provides trivial equality and comparison between numbers, strings and booleans. Other types are considered inequal or incomparable to each other. Incomparability between values are represented by operators returning null (e.g. 2 > "1" is null).

5.1Equality
Simple values such as numbers, strings, booleans and null are equal when they contain the same data. All other values are considered inequal to each other (e.g. [] != []).

In GROQ 1 == null returns false (which is different from e.g. SQL).
Equal(a, b)
If both a and b is null:
Return true.
Let cmp be the result of PartialCompare(a, b).
If cmp is Equal:
Return true.
Otherwise:
Return false.
5.2Partial comparison
A partial comparison between two values return either Greater, Equal, Less or null. null represents that the values are incomparable to each other. This is used by the comparison operators (<, ≤, >, ≥).

PartialCompare(a, b)
If the type of a is different from the type of b:
Return null.
If a is a datetime, consider the datetimes as absolute points in time in the UTC time zone:
If a < b:
Return Less.
If a > b:
Return Greater.
If a = b:
Return Equal.
If a is a number:
If a < b:
Return Less.
If a > b:
Return Greater.
If a = b:
Return Equal.
If a is a string:
For each Unicode code point (aCodePoint, bCodePoint) in a and b:
If aCodePoint < bCodePoint:
Return Less.
If aCodePoint > bCodePoint: \* Return Greater.
If a is shorter than b:
Return Less.
If a is longer than b:
Return Greater.
Return Equal.
If a is a boolean:
Return the comparison between a and b with false < true.
Return null.
5.3Total comparison
A total comparison between two values return either Greater, Equal or Less. It provides a consistent ordering of values of different types (for string, numbers and boolean) and considers all other types to be equal to each other. This is used by the order() function.

TypeOrder(val)
If val is a datetime:
Return 1.
If val is a number:
Return 2.
If val is a string:
Return 3.
If val is a boolean:
Return 4.
Return 5.
TotalCompare(a, b)
Let aTypeOrder be the result of TypeOrder(a).
Let bTypeOrder be the result of TypeOrder(b).
If aTypeOrder != bTypeOrder:
Return the result of PartialCompare(aTypeOrder, bTypeOrder).
Let result be the result of PartialCompare(a, b).
If result is null:
Return Equal.
Otherwise:
Return result.
6Simple expressions
6.1This expression
A this expression returns the this value of the current scope.

\*[\_id == "doc"][0].numbers[@ >= 10]
~
This
@
EvaluateThis(scope)
Return the this value of scope.
6.2This attribute expression
A this attribute expression returns an attribute from the this value of the current scope.

\*[\_id == "document"][name == "Michael Bluth"]

```~~~~
ThisAttribute
Identifier
EvaluateThisAttribute(scope)
Let base be the this value of scope.
Let name be the string value of the Identifier.
If base is not an object, return null.
If base does not contain an attribute name, return null.
Return the value of the attribute name in base.
6.3Everything expression
An everything expression returns the full dataset.

*[_type == "person"]
~
Everything
*
EvaluateEverything(scope)
Let context be the query context of scope.
Return the dataset of context.
6.4Parent expression
A parent expression returns a this value for an upper scope.

// Find all people who have a cool friend
*[_type == "person" && *[_id == ^.friend._ref][0].isCool]
                              ~
Parent
^
^.Parent
EvaluateParent(scope)
Let level be the number of ^ in the parent expression.
Let currentScope be scope.
While level is greater than zero:
Set currentScope to the parent of currentScope.
If currentScope is now null, return null.
Decrease level by one.
Return the this value of currentScope.
6.5Parameter expression
A parameter expression returns the value of a parameter

*[_type == $type]
         ~~~~~
Parameter
$Identifier
EvaluateParameter(scope)
Let name be the string value of the Identifier.
Return the value of the parameter in scope.
ValidateParameter()
Let name be the string value of the Identifier.
If the parameter doesn’t exist in the current validation context:
Report an error.
6.6Function call expression
GROQ comes with a set of built-in functions which provides additional features. See the “Functions” for available functions and their namespaces.

Custom GROQ functions can be defined to extend or override the built-in function set. See Custom functions for details.

*{"score": round(score, 2)}
         ~~~~~~~~~~~~~~~

*{"description": global::lower(description)}
               ~~~~~~~~~~~~~~~~~~~~~~~~~~~
FuncCall
FuncNamespaceoptFuncIdentifier(FuncCallArgs)
FuncNamespace
Identifier::
FuncIdentifier
Identifier
FuncCallArgs
Expression
FuncCallArgs,Expression
EvaluateFuncCall(scope)
Let namespace be the string value of the FuncNamespace.
Let name be the string value of the FuncIdentifier.
Let args be an empty array.
For each Expression in FuncCallArgs:
Let argumentNode be the Expression.
Append argumentNode to args.
If the query context of scope has a function defined with the given name and namespace:
Let funcBody be body of the custom function.
Let context be the query context of scope.
Let newScope be the result of NewRootScope(context).
For each param in the parameter list of the custom function:
Let argNode be next Expression in FuncCallArgs.
Let arg be the result of Evaluate(argNode, scope).
Set the parameter named param in newScope to arg.
Return the result of Evaluate(funcBody, newScope)
Otherwise:
Let func be the function defined under the name name in either namespace namespace if provided, or the global namespace.
Return the result of func(args, scope).
ValidateFuncCall()
Let name be the string value of the FuncIdentifier.
Let namespace be the string value of the FuncNamespace.
Let args be an array of the Expressions in FuncCallArgs.
If there’s a custom function defined with the given name and namespace:
For each arg in args:
Execute Validate(arg).
Stop.
If there is no namespace named namespace:
Stop and report an error.
If there is no function named name defined in either namespace namespace if provided, or the global namespace:
Stop and report an error.
Let validator be the validator for the function under the name name.
Execute validator(args).
7Compound expressions
7.1Parenthesis expression
A parenthesis expression allows you to add parenthesis around another expression to control precedence of operators.

(1 + 2) * 3
```

Parenthesis
(Expression)
EvaluateParenthesis(scope)
Let innerNode be the Expression.
Let result be the result of Evaluate(innerNode, scope).
Return result.
7.2Traversal expression
A traversal expressions starts a traversal.

users.foo.bar[0].sources[]->name
When the left-hand side is an Everything, Array, or PipeFuncCall this is interpreted as if there was an additional explicit ArrayPostfix traversal. E.g. _.\_id is interpreted as _[].\_id and therefore returns an array of IDs.

TraversalExpression
ExpressionTraversal
Traversal
TraversalPlain
TraversalArray
TraversalArraySource
TraversalArrayTarget
EvaluateTraversalExpression(scope)
Let node be the Expression.
Let traversalNode be the Traversal.
Let base be the result of Evaluate(node, scope).
If node is one of Everything, Array, PipeFuncCall:
Let traverse be the traversal function for the combination ArrayPostfix and traversalNode.
Otherwise:
Let traverse be the traverse function of traversalNode.
Return traverse(base, scope).
7.3Pipe function call expression
GROQ comes with a set of built-in pipe functions which provides additional features. Pipe functions always accepts an array on the left-hand side and returns another array, and the syntax is optimized for being able to chain it together with other compound expressions. See the “Pipe functions” for available functions.

\*[_type == "person"] | order(name) | {age}

```
PipeFuncCall
Expression|FuncCall
EvaluatePipeFuncCall(scope)
Let baseNode be the first Expression.
Let base be the result of Evaluate(baseNode, scope).
If base is not an array:
Return null.
Let name be the string value of the Identifier of the FuncCall.
Let args be an empty array.
For each Expression in the FuncCallArgs of the FuncCall.
Let argumentNode be the Expression.
Append argumentNode to args.
Let func be the pipe function defined under the name name.
Return the result of func(base, args, scope).
ValidatePipeFuncCall()
Let base be the first Expression.
Execute Validate(base).
Let name be the string value of the Identifier of the FuncCall.
If there is no pipe function named name:
Stop and report an error.
Let args be an array of the Expressions in the FuncCallArgs of the FuncCall.
Let validator be the validator for the pipe function under the name name.
Execute validator(args).
8Traversal operators
8.1Attribute access traversal
An attribute access returns an attribute of an object.

person.name
~~~~~

person["Full Name"]
```

AttributeAccess
.Identifier
[Expression]
Filter, ElementAccess, AttributeAccess are syntactically ambiguous. See “Disambiguating square bracket traversal” for how to disambiguate between them.
EvaluateAttributeAccess(base, scope)
If base is not an object, return null.
Let name be the string value of String or Identifier.
If base does not contain an attribute name, return null.
Return the value of the attribute name in base.
8.2Element access traversal
An element access returns an element stored in an array. The array is 0-indexed and a negative index accesses the array from the end (i.e. an index of -1 returns the last element; -2 refers to the second last element).

ElementAccess
[Expression]
Filter, ElementAccess, AttributeAccess are syntactically ambiguous. See “Disambiguating square bracket traversal” for how to disambiguate between them.
EvaluateElementAccess(base, scope)
If base is not an array, return null.
Let idxNode be the second Expression.
Let idx be the result of Evaluate(idxNode, scope). This value is guaranteed to be an integer due to the validation.
If idx is negative, add the length of base to idx.
If idx is still negative, return null.
If idx is equal to or greater than the length of base, return null.
Return the value stored at position idx in base.
ValidateElementAccess()
Let idxNode be the second Expression.
Let idx be the result of ConstantEvaluate(idxNode). This value is guaranteed to be a number due to square bracket disambiguation.
If idx is not an integer: Report an error.
8.3Slice traversal
A slice returns a slice of an array.

people[0..10]

````
Slice
[Range]
EvaluateSlice(base, scope)
Let base be the result of Evaluate(baseNode, scope).
If base is not an array, return null.
Process the left index:
Let leftNode be the left value of the Range.
Let left be the result of Evaluate(leftNode, scope). This value is guaranteed to be an integer due to the validation.
If left is negative, add the length of base to left.
Clamp left between 0 and (the length of base minus 1).
Process the right index:
Let rightNode be the right value of the Range.
Let right be the result of Evaluate(rightNode, scope). This value is guaranteed to be an integer due to the validation.
If right is negative, add the length of base to right.
If the Range is exclusive, subtract one from right.
Clamp right between 0 and (the length of base minus 1).
Let result be an array containing the elements of base from position left up to and including position right.
Return result.
ValidateSlice()
Let leftNode be the left value of the Range.
Let leftValue be the result of ConstantEvaluate(leftNode).
If leftValue is not an integer: Report an error.
Let rightNode be the right value of the Range.
Let rightValue be the result of ConstantEvaluate(rightNode).
If rightValue is not an integer: Report an error.
8.4Filter traversal
A filter returns an array filtered another expression.

\*[_type == "person"]

```
Filter
[Expression]
Filter, ElementAccess, AttributeAccess are syntactically ambiguous. See “Disambiguating square bracket traversal” for how to disambiguate between them.
EvaluateFilter(base, scope)
If base is not an array, return base.
Let filterNode be the second Expression.
Let result be a new empty array.
For each element value in baseValue:
Let elementScope be the result of NewNestedScope(value, scope).
Let matched be the result of Evaluate(filterNode, elementScope).
If matched is true, append value to result.
Return result.
8.5Array postfix traversal
An array postfix coerces the value into an array.

ArrayPostfix
[]
EvaluateArrayPostfix(base, scope)
If base is not an array, return null.
Return base.
8.6Projection traversal
A projection operator returns a new object.

*[_type == "person"]{name, "isLegal": age >= 18}
                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Projection
|optObject
EvaluateProjection(base, scope)
Let objNode be the Object.
If base is not an object:
Return null.
Let elementScope be the result of NewNestedScope(base, scope).
Let result be the result of Evaluate(objNode, elementScope).
Return result.
8.7Dereference traversal
Dereference
->Identifieropt
EvaluateDereference(base, scope)
If base is not an object:
Return null.
If base does not have an attribute _ref:
Return null.
Let ref be the value of the attribute _ref in base.
If ref is not a string:
Return null.
Let dataset be the dataset of the query context of scope.
If dataset is not an array:
Return null.
Let result be null.
For each document in dataset:
If document is an object and has an attribute _id:
Let id be the value of the attribute _id in document.
If Equal(ref, id) is true:
Set result to document.
Stop the loop.
If the dereference expression contains a Identifier:
Let name be the string value of the Identifier.
If result is an object and contains an attribute name:
Return the value of the attribute name in result.
Otherwise:
Return null.
Return result.
8.8Disambiguating square bracket traversal
Filter, ElementAccess and AttributeAccess are syntactically ambiguous, and the following algorithm is used to disambiguate between them.

SquareBracketTraversal
[Expression]
DisambiguateSquareBracketTraversal()
Let valueNode be the Expression.
Let value be the result of ConstantEvaluate(valueNode).
If value is a string: Interpret it as an AttributeAccess traversal.
If value is a number: Interpret it as an ElementAccess traversal.
Otherwise: Interpret it as a Filter traversal.
9Operators
9.1And operator
And
Expression&&Expression
EvaluateAnd(scope)
Let leftNode be the first Expression.
Let left be the result of Evaluate(leftNode, scope).
Let rightNode be the last Expression.
Let right be the result of Evaluate(rightNode, scope).
If left or right is false:
Return false.
If left or right is not a boolean:
Return null.
Return true.
9.2Or operator
Or
Expression||Expression
EvaluateOr(scope)
Let leftNode be the first Expression.
Let left be the result of Evaluate(leftNode, scope).
Let rightNode be the last Expression.
Let right be the result of Evaluate(rightNode, scope).
If left or right is true:
Return true.
If left or right is not a boolean:
Return null.
Return false.
9.3Not operator
Not
!Expression
EvaluateNot(scope)
Let valueNode be the Expression.
Let value be the result of Evaluate(valueNode, scope).
If value is false:
Return true.
If value is true:
Return false.
Return null.
9.4Equality operators
Equality
ExpressionEqualityOperatorExpression
EqualityOperator
==	,	!=
EvaluateEquality(scope)
Let leftNode be the first Expression.
Let left be the result of Evaluate(leftNode, scope).
Let rightNode be the last Expression.
Let right be the result of Evaluate(rightNode, scope).
Let result be the result of Equal(left, right).
If the operator is !=:
If result is true:
Return false.
If result is false:
Return true.
Return result.
9.5Comparison operators
Comparison
ExpressionComparisonOperatorExpression
ComparisonOperator
<	,	<=	,	>	,	>=
EvaluateComparison(scope)
Let leftNode be the first Expression.
Let left be the result of Evaluate(leftNode, scope).
Let rightNode be the last Expression.
Let right be the result of Evaluate(rightNode, scope).
Let cmp be the result of PartialCompare(left, right).
If cmp is null:
Return null.
If cmp is Less and the operator is < or <=:
Return true.
If cmp is Greater and the operator is > or >=:
Return true.
If cmp is Equal and the operator is <= or >=:
Return true.
Return false.
9.6In operator
In
ExpressioninExpression
ExpressioninRange
EvaluateIn(scope)
Let leftNode be the first Expression.
Let left be the result of Evaluate(leftNode, scope).
If the right-hand side is a Range:
Let lowerNode be the start node of the range.
Let lower be the result of Evaluate(lowerNode, scope).
Let upperNode be the end node of the range.
Let upper be the result of Evaluate(upperNode, scope).
Let leftCmp be the result of PartialCompare(left, lower).
Let rightCmp be the result of PartialCompare(left, upper).
If leftCmp or rightCmp is null:
Return null.
If leftCmp is Less:
Return false.
If rightCmp is Greater:
Return false.
If the range is exclusive and rightCmp is Equal:
Return false.
Return true.
Let rightNode be the last Expression.
Let right be the result of Evaluate(rightNode, scope).
If right is an array:
For each value in right:
If Equal(left, value) is true:
Return true.
Return false.
Return null.
9.7Match operator
The match operator is defined in terms of patterns and tokens: It returns true when any of patterns matches all of the tokens. The exact way of tokenizing text and interpreting patterns is left as an implementation detail.

Match
ExpressionmatchExpression
EvaluateMatch(scope)
Let leftNode be the first Expression.
Let left be the result of Evaluate(leftNode, scope).
Let rightNode be the last Expression.
Let right be the result of Evaluate(rightNode, scope).
Let tokens be an empty array.
If left is a string:
Concatenate MatchTokenize(left) to tokens.
If left is an array:
For each value in left:
If value is a string:
Concatenate MatchTokenize(value) to tokens.
Let patterns be an empty array.
If right is a string:
Append MatchAnalyzePattern(right) to patterns.
If right is an array:
For each value in right:
If value is a string:
Append MatchAnalyzePattern(value) to patterns.
Otherwise: * Return false.
If patterns is empty:
Return false.
For each pattern in patterns:
If pattern does not matches tokens:
Return false.
Return true.
MatchTokenize(value)
Return an array of tokens.
MatchAnalyzePattern(value)
Return a pattern for the given string.
9.8Asc operator
The asc operator is used by the order() function to signal that you want ascending sorting. Evaluating it in any other context is not allowed.

Asc
Expressionasc
ValidateAsc()
Report an error.
9.9Desc operator
The desc operator is used by the order() function to signal that you want descending sorting. Evaluating it in any other context is not allowed.

Desc
Expressiondesc
ValidateDesc()
Report an error.
9.10Unary plus operator
UnaryPlus
+Expression
EvaluateUnaryPlus(scope)
Let valueNode be the Expression.
Let value be the result of Evaluate(valueNode, scope).
If value is a number:
Return value.
Return null.
9.11Unary minus operator
UnaryMinus
-Expression
EvaluateUnaryMinus(scope)
Let valueNode be the Expression.
Let value be the result of Evaluate(valueNode, scope).
If value is a number:
Return value with opposite sign.
Return null.
9.12Binary plus operator
Plus
Expression+Expression
EvaluatePlus(scope)
Let leftNode be the first Expression.
Let left be the result of Evaluate(leftNode, scope).
Let rightNode be the last Expression.
Let right be the result of Evaluate(rightNode, scope).
If both left and right are strings:
Return the string concatenation of left and right.
If both left and right are numbers:
Return the addition of left and right.
If both left and right are arrays:
Return the concatenation of left and right.
If both left and right are objects:
Return the merged object of left and right. For duplicate fields the value from right takes precedence.
If left is a datetime and right is a number:
Return a new datetime that adds (or subtracts, if negative) right as a number of seconds to left.
Return null.
9.13Binary minus operator
Minus
Expression-Expression
EvaluateMinus(scope)
Let leftNode be the first Expression.
Let left be the result of Evaluate(leftNode, scope).
Let rightNode be the last Expression.
Let right be the result of Evaluate(rightNode, scope).
If both left and right are numbers:
Return the subtraction of left from right.
If both left and right are datetimes:
Return the difference, in seconds, between left from right.
If left is a datetime and right is a number:
Return a new datetime being left minus right as seconds.
Return null.
9.14Binary star operator
Star
Expression**Expression
EvaluateStar(scope)
Let leftNode be the first Expression.
Let left be the result of Evaluate(leftNode, scope).
Let rightNode be the last Expression.
Let right be the result of Evaluate(rightNode, scope).
If both left and right are numbers:
Return the multiplication of left and right.
Return null.
A binary star operator may not have a * immediately following it since this may cause ambiguity.
9.15Binary slash operator
Slash
Expression/Expression
EvaluateSlash(scope)
Let leftNode be the first Expression.
Let left be the result of Evaluate(leftNode, scope).
Let rightNode be the last Expression.
Let right be the result of Evaluate(rightNode, scope).
If both left and right are numbers:
Return the division of left by right.
Return null.
9.16Binary percent operator
Percent
Expression%Expression
EvaluatePercent(scope)
Let leftNode be the first Expression.
Let left be the result of Evaluate(leftNode, scope).
Let rightNode be the last Expression.
Let right be the result of Evaluate(rightNode, scope).
If both left and right are numbers:
Return the remainder of left after division by right.
Return null.
9.17Binary double star operator
StarStar
Expression**Expression
EvaluateStarStar(scope)
Let leftNode be the first Expression.
Let left be the result of Evaluate(leftNode, scope).
Let rightNode be the last Expression.
Let right be the result of Evaluate(rightNode, scope).
If both left and right are numbers:
Return the exponentiation of left to the power of right.
Return null.
10Precedence and associativity
In this specification the various expressions and operators are defined in ambiguously in terms on precedence and associativity. The table below describes the precedence levels used to determine the correct unambiguous interpretation.

From highest to lowest:

Level 11: Compound expressions.
Level 10, prefix: +, !.
Level 9, right-associative: **.
Level 8, prefix: -.
Level 7, left-associative: Multiplicatives (*, /, %).
Level 6, left-associative: Additives (+, -).
Level 5, non-associative: Ranges (.., ...).
Level 4, non-associative: Comparisons (==, !=, >, >=,<, <=, in, match).
Level 4, postfix: Ordering (asc, desc).
Level 3, left-associative: &&.
Level 2, left-associative: ||.
Level 1, non-associative: =>.
11Functions
Functions provide additional functionality to GROQ queries. They are invoked through a Function call expression. Note that function arguments are not evaluated eagerly, and it’s up to the function to decide which scope the arguments are evaluated it. As such, all functions below take an array of nodes.

An implementation may provide additional functions, but should be aware that this can cause problems when interoperating with future versions of GROQ.

Functions are namespaced which allows to group functions by logical scope. A function may be associated with multiple namespaces and behave differently. When a function is called without a namespace, it is by default associated with a “global” namespace.

11.1Global namespace
11.1.1global::after()
The after function, in delta mode, returns the attributes after the change.

global_after(args, scope)
Return the after object of the query context of scope.
global_after_validate(args, scope)
If the length of args is not 0:
Report an error.
If the mode of the query context of scope is not “delta”:
Report an error.
11.1.2global::before()
The before function, in delta mode, returns the attributes before the change.

global_before(args, scope)
Return the before object of the query context of scope.
global_before_validate(args, scope)
If the length of args is not 0:
Report an error.
If the mode of the query context of scope is not “delta”:
Report an error.
11.1.3global::coalesce()
The coalesce function returns the first value of the arguments which is not null.

global_coalesce(args, scope)
For each arg in args:
Let value be the result of Evaluate(arg, scope).
If value is not null:
Return value.
Return null.
11.1.4global::count()
The count function returns the length of an array.

global_count(args, scope)
Let baseNode be the first element of args.
Let base be the result of Evaluate(baseNode, scope).
If base is an array:
Return the length of base.
Otherwise:
Return null.
global_count_validate(args)
If the length of args is not 1:
Report an error.
11.1.5global::dateTime()
The dateTime function takes a string or another datatime value, returning a datetime value. This function is idempotent.

global_dateTime(args, scope)
Let baseNode be the first element of args.
Let base be the result of Evaluate(baseNode, scope).
If base is a string:
Try to parse base as a datetime using the RFC 3339 timestamp format.
If the input is a valid datetime:
Return the datetime.
If base is a datetime value:
Return base.
Return null.
global_dateTime_validate(args)
If the length of args is not 1:
Report an error.
11.1.6global::defined()
The defined function checks if the argument is not null.

global_defined(args, scope)
Let baseNode be the first element of args.
Let base be the result of Evaluate(baseNode, scope).
If base is null:
Return false.
Otherwise:
Return true.
global_defined_validate(args)
If the length of args is not 1:
Report an error.
11.1.7global::length()
The length function returns the length of a string or an array.

global_length(args, scope)
Let baseNode be the first element of args.
Let base be the result of Evaluate(baseNode, scope).
If base is a string:
Return the length of base.
If base is an array:
Return the length of base.
Return null.
global_length_validate(args)
If the length of args is not 1:
Report an error.
11.1.8global::now()
The now function returns the current point in time as a string.

This function returns a string due to backwards compatibility. It’s recommended to use dateTime::now() instead which returns a proper datetime.
global_now(args, scope)
Let ts be a datetime representing the current point in time.
Let result be a RFC 3339 string formatting of ts.
Return result.
global_now_validate(args)
If the length of args is not 0:
Report an error.
11.1.9global::references()
The references function implicitly takes this value of the current scope and recursively checks whether it contains any references to the given document ID.

global_references(args, scope)
Let pathSet be an empty array.
For each arg of args:
Let path be the result of Evaluate(arg, scope).
If path is a string:
Append path to pathSet.
If path is an array:
Concatenate all strings of path to pathSet.
If pathSet is empty:
Return false.
Let base be the this value of scope.
Return the result of HasReferenceTo(base, pathSet).
HasReferenceTo(base, pathSet)
If base is an array:
For each value in base:
Let result be the result of HasReferenceTo(value, pathSet).
If result is true:
Return true.
Return false.
If base is an object:
If base has an attribute _ref:
Let ref be the value of the attribute _ref in base.
If ref exists in pathSet:
Return true.
Otherwise:
Return false.
For each key and value in base:
Let result be the result of HasReferenceTo(value, pathSet).
If result is true:
Return true.
Return false.
global_references_validate(args)
If the length of args is 0:
Report an error.
11.1.10global::round()
The round function accepts a number and rounds it to a certain precision.

global_round(args, scope)
Let numNode be the first element of args.
Let num be the result of Evaluate(numNode, scope).
If num is not a number:
Return null.
If the length of args is 2:
Let precNode be the second element of args.
Let prec be the result of Evaluate(precNode, scope).
If prec is not a number:
Return null.
Otherwise:
Let prec be 0.
Return num rounded to prec number of digits after the decimal point.
global_round_validate(args)
If the length of args is less than 1 or greater than 2:
Report an error.
11.1.11global::select()
The select function chooses takes a variable number of arguments that are either pairs or any other type and iterates over them. When encountering a pair whose left-hand value evaluates to true, the right-hand value is returned immediately. When encountering a non-pair argument, that argument is returned immediately. Falls back to returning null.

global_select(args, scope)
For each arg in args:
If arg is a Pair:
Let condNode be the first Expression of the Pair.
Let resultNode be the second Expression of the Pair.
Let cond be the result of Evaluate(condNode, scope).
If cond is true:
Return the result of Evaluate(resultNode, scope).
Otherwise:
Return the result of Evaluate(arg, scope).
global_select_validate(args)
Let seenDefault be false.
For each arg in args:
If seenDefault is true:
Report an error.
If arg is not a Pair:
Set seenDefault to true.
11.1.12global::string()
The string function returns the string representation of scalar values or null for any other values.

global_string(args, scope)
Let node be the first element of args.
Let val be the result of Evaluate(node, scope).
If val is true:
Return the string "true".
If val is false:
Return the string "false".
If val is a string:
Return val.
If val is a number:
Return a string representation of the number.
If val is a datetime:
Return the datetime in the RFC 3339 timestamp format with a Z suffix.
Otherwise:
Return null.
global_string_validate(args)
If the length of args is not 1:
Report an error.
11.1.13global::boost()
The boost function accepts an expression and a boost value, and increases or decreases the score computed by score() (see “Pipe functions”) accordingly. boost can only be used within the argument list to score().

* | score(boost(title matches "milk", 5.0), body matches "milk")
The expression must be a predicate expressions that evaluates to a single boolean value. Any other result value is ignored.

The value argument must be a number ≥ 0.

The return value is the same as the input predicate. Internally, the scoring execution model uses the provided boost value to increase the computed score if the predicate matches.

boost(args, scope)
Let predicateNode be the first element of args.
Let result be the result of Evaluate(predicateNode, scope).
Let numNode be the second element of args.
Let num be the result of Evaluate(numNode, scope).
If num is not a number:
Return null.
If num is negative:
Return null.
Return result.
boost_validate(args)
If the length of args is not 2:
Report an error.
11.1.14global::lower()
The lower function returns lowercased string.

global_lower(args, scope)
Let value be the result of Evaluate(arg, scope).
If value is not null:
Return lowercase form of value.
Return null.
global_lower_validate(args)
If the length of args is not 1:
Report an error.
11.1.15global::upper()
The upper function returns uppercased string.

global_upper(args, scope)
Let value be the result of Evaluate(arg, scope).
If value is not null:
Return uppercase form of value.
Return null.
global_upper_validate(args)
If the length of args is not 1:
Report an error.
In addition to the functions mentioned above, constructors for extensions are global as well.

11.2Date/time namespace
The dateTime namespace contains functions to work with datetimes.

11.2.1dateTime::now()
The now function in the dateTime namespace returns the current point in time as a datetime.

dateTime_now(args, scope)
Let result be a datetime representing the current point in time.
Return result.
dateTime_now_validate(args)
If the length of args is not 0:
Report an error.
11.3Diff namespace
The diff namespace contains functionality for comparing objects.

11.3.1diff::changedAny()
The changedAny function in the diff namespace returns a boolean if any of the key paths matched by the selector are changed.

diff_changedAny(args, scope)
Let lhs be the first element of args.
Let rhs be the second element of args.
Let selector be the third element of args.
Let before be the result of Evaluate(lhs, scope).
Let after be the result of Evaluate(rhs, scope).
Let selectedKeyPaths be the result of EvaluateSelector(selector, before, scope).
Let diffKeyPaths be the list of key paths that are different in before and after.
If diffKeyPaths overlaps with selectedKeyPaths:
Return true.
Otherwise:
Return false.
diff_changedAny_validate(args)
If the length of args is not 3:
Report an error.
If the third element is not a Selector:
Report an error.
11.3.2diff::changedOnly()
The changedOnly function in the diff namespace returns a boolean if given two nodes only the given key paths matched by the selector are changed.

diff_changedOnly(args, scope)
Let lhs be the first element of args.
Let rhs be the second element of args.
Let selector be the third element of args.
Let before be the result of Evaluate(lhs, scope).
Let after be the result of Evaluate(rhs, scope).
Let selectedKeyPaths be the result of EvaluateSelector(selector, before, scope).
Let diffKeyPaths be the list of key paths that are different in before and after.
If diffKeyPaths is a subset of selectedKeyPaths:
Return true.
Otherwise:
Return false.
diff_changedOnly_validate(args)
If the length of args is not 3:
Report an error.
If the third element is not a Selector:
Report an error.
11.4Delta namespace
The delta namespace contains functions which are valid in delta mode.

11.4.1delta::changedAny
delta::changedAny is a variant of diff::changedAny which works on the before/after objects.

delta_changedAny(args, scope)
Let before and after be the before/after objects of the query context to scope.
Let selector by the first element of args.
Let result be the result of diff_changedAny(before, after, selector).
Return result.
delta_changedAny_validate(args, scope)
If the mode of the query context of scope is not “delta”:
Report an error.
If the first element is not a Selector:
Report an error.
11.4.2delta::changedOnly
delta::changedOnly is a variant of diff::changedOnly which works on the before/after objects.

delta_changedOnly(args, scope)
Let before and after be the before/after objects of the query context to scope.
Let selector by the first element of args.
Let result be the result of diff_changedOnly(before, after, selector).
Return result.
delta_changedOnly_validate(args, scope)
If the mode of the query context of scope is not “delta”:
Report an error.
If the first element is not a Selector:
Report an error.
11.4.3delta::operation()
The operation function returns the current operation ("create", "update", "delete") of a change in delta mode.

delta_operation(args, scope)
Let before and after be the before/after objects of the query context to scope.
If before is null:
Return "create".
If after is null:
Return "delete".
Return "update".
delta_operation_validate(args)
If the length of args is not 0:
Report an error.
11.5Array namespace
The array namespace contains functions to work with arrays.

11.5.1array::join()
The join function concatenates together the elements of an array into a single output string. Only primitive values supported by global::string() can be collected. Objects, arrays, etc. are considered composite values that cannot be joined.

array_join(args, scope)
Let arrNode be the first element of args.
Let sepNode be the second element of args.
Let arr be the result of Evaluate(arrNode, scope).
Let sep be the result of Evaluate(sepNode, scope).
If arr is not an array:
Return null.
If sep is not a string:
Return null.
Let output be an empty string.
For each element in arr:
Let elem be the element.
Let index be the index of the element.
If index is greater than or equal to 1, append sep to output.
Let str be the result of evaluating global::string(elem).
If str is null:
Return null.
Otherwise:
Append str to output.
Return output.
array_join_validate(args)
If the length of args is not 2:
Report an error.
11.5.2array::compact()
The compact function filters null values from an array.

array_compact(args, scope)
Let arrNode be the first element of args.
Let arr be the result of Evaluate(arrNode, scope).
If arr is not an array:
Return null
Let output be an empty array.
For each element in arr:
Let elem be the element
If elem is not null:
Append elem to output.
Return output.
array_compact_validate(args)
If the length of args is not 1:
Report an error.
11.5.3array::unique()
The unique function filters duplicate values from an array.

Only values that can be compared for equality are compared for uniqueness. All other values are considered individually unique. For example, array::unique([[1], [1]]) should return [[1], [1]].

The algorithm below specifies a linear search, but since an implementation can choose to use hashing or a similar non-order-preserving data structure for efficiency, the order of the output cannot be guaranteed to be the same as the input.

array_unique(args, scope)
Let arrNode be the first element of args.
Let arr be the result of Evaluate(arrNode, scope).
If arr is not an array:
Return null.
Let output be an empty array.
For each element in arr:
Let elem be the element
Let found be false.
If elem is comparable (see above):
For each element in arr:
Let b be the element.
Set found be the result of Equal(elem, b)
If found is true:
Break loop
If found is false:
Add elem to output at any position.
Return output.
array_unique_validate(args)
If the length of args is not 1:
Report an error.
11.5.4array::intersects()
The intersects function compares two arrays, returning true if they have any elements in common.

Only values that can be compared for equality are considered when determining whether there are common values.

array_intersects(args, scope)
Let firstNode be the first element of args.
Let first be the result of Evaluate(firstNode, scope).
If first is not an array:
Return null.
Let secondNode be the first element of args.
Let second be the result of Evaluate(secondNode, scope).
If second is not an array:
Return null.
For each element in first:
Let a be the element.
For each element in second:
Let b be the element.
Set equal to be the result of Equal(a, b).
If equal is true:
Return true.
Return false.
array_intersects_validate(args)
If the length of args is not 2:
Report an error.
11.6String namespace
The string namespace contains functions to work with strings.

11.6.1string::split()
The split function splits a string into multiple strings, given a separator string.

string_split(args, scope)
Let strNode be the first element of args.
Let sepNode be the second element of args.
Let str be the result of Evaluate(strNode, scope).
If str is not a string, return null.
Let sep be the result of Evaluate(sepNode, scope).
If sep is not a string, return null.
Let output be an empty array.
If sep is an empty string:
Let output be each character of str, according to Unicode character splitting rules.
Otherwise:
Let output be each substring of str as separated by sep. An empty string is considered a substring, and will be included when sep is present at the beginning, the end, or consecutively of str. For example, the string ,a,b, when split by , will result in four substrings ['', 'a', 'b', ''].
Return output.
string_split_validate(args)
If the length of args is not 2:
Report an error.
11.6.2string::startsWith()
The startsWith function evaluates whether a string starts with a given prefix.

string_startsWith(args, scope)
Let strNode be the first element of args.
Let prefixNode be the second element of args.
Let str be the result of Evaluate(strNode, scope).
If str is not a string, return null.
Let prefix be the result of Evaluate(sepNode, scope).
If prefix is not a string, return null.
Let n be the length of prefix.
If n is zero:
Return true.
If the first n characters of str equal prefix:
Return true.
Otherwise return false.
string_startsWith_validate(args)
If the length of args is not 2:
Report an error.
11.7Math namespace
The math namespace contains functions for performing mathematical operations.

11.7.1math::sum()
The sum function computes the sum of all numbers in an array. null values are ignored, but non-numbers cause the function to return null. If the array does not contain at least one numeric value, it returns 0.

math_sum(args, scope)
Let arrNode be the first element of args.
Let arr be the result of Evaluate(arrNode, scope).
If arr is not an array, return null.
Let n be zero.
For each element elem in arr:
If elem is null:
Ignore it.
If elem is not a number:
Return null.
Otherwise:
Add elem to n.
Return n.
math_sum_validate(args)
If the length of args is not 1:
Report an error.
11.7.2math::avg()
The avg function computes the arithmetic mean of all numbers in an array. null values are ignored, but non-numbers cause the function to return null. If the array does not contain at least one numeric value, it returns null.

math_avg(args, scope)
Let arrNode be the first element of args.
Let arr be the result of Evaluate(arrNode, scope).
If arr is not an array, return null.
Let n be zero.
Let count be zero.
For each element elem in arr:
If elem is null:
Ignore it.
If elem is not a number:
Return null.
Otherwise:
Increment count.
Add elem to n.
If count is zero:
Return null.
Return n divided by the count.
math_avg_validate(args)
If the length of args is not 1:
Report an error.
11.7.3math::min()
The min function finds the smallest numeric value in an array. null values are ignored, but non-numbers cause the function to return null. If the array does not contain at least one numeric value, it returns null.

math_min(args, scope)
Let arrNode be the first element of args.
Let arr be the result of Evaluate(arrNode, scope).
If arr is not an array, return null.
Let min be null.
For each element elem in arr:
If elem is null:
Ignore it.
If elem is not a number:
Return null.
Otherwise:
If min is null or PartialCompare(elem, min) is Lower:
Set min to elem.
Return min.
math_min_validate(args)
If the length of args is not 1:
Report an error.
11.7.4math::max()
The max function finds the largest numeric value in an array. null values are ignored, but non-numbers cause the function to return null. If the array does not contain at least one numeric value, it returns null.

math_max(args, scope)
Let arrNode be the first element of args.
Let arr be the result of Evaluate(arrNode, scope).
If arr is not an array, return null.
Let max be null.
For each element elem in arr:
If elem is null:
Ignore it.
If elem is not a number:
Return null.
Otherwise:
If max is null or PartialCompare(elem, max) is Greater:
Set max to elem.
Return max.
math_max_validate(args)
If the length of args is not 1:
Report an error.
12Custom Functions
Custom functions are reusable sets of query substructures that allow for the modular composition of GROQ queries.

12.1Function Definition
Functions MUST be defined in the beginning of a query using the delimiter ;. A function definition MUST start with the keyword fn. All custom defined functions MUST live in a namespace.

FuncDecl
fnFuncNamespaceFuncIdentifierFuncParams=FuncBody;
12.2Function invocation
FuncParams
(Param)
13Pipe functions
Pipe functions provide additional functionality to GROQ queries. They are invoked through a Pipe function call expression. They differ from regular functions in that they always accept an array as input and returns another array (or null). As such, the syntax is optimized for chaining (the array it works on comes on the left-hand side instead of being an argument):

*[_type == "person"] | order(name) | {age}
that function arguments are not evaluated eagerly, and it’s up to the function to decide which scope the arguments are evaluated in. All definitions below take an array of nodes.
An implementation may provide additional pipe functions, but should be aware that this can cause problems when interoperating with future versions of GROQ.

13.1global::order()
The order function sorts an array based on arbitrary expressions.

order(base, args, scope)
Let cmp be a function which takes two arguments and returns either Less, Equal or Greater.
Define cmp(left, right) as follows:
Let leftScope be the result of NewNestedScope(left, scope).
Let rightScope be the result of NewNestedScope(right, scope).
For each argNode of args:
Let direction be Normal.
Let valueNode be argNode.
If valueNode is an Asc operator: * Set valueNode to be the Expression of the Asc operator.
Else if valueNode is a Desc operator: * Set direction to Reverse.
Set valueNode to be the Expression of the Desc operator.
Let leftValue be the result of Evaluate(valueNode, leftScope).
Let rightValue be the result of Evaluate(valueNode, rightScope).
Let order be the result of TotalCompare(leftValue, rightValue).
If direction is Reverse and order is Less: * Set order to Greater.
Else if direction is Reverse and order is Greater: * Set order to Less.
If order is not Equal: * Return order.
Return Equal.
Return a sorted array using cmp as the comparator function.
order_validate(args)
If the length of args is 0:
Report an error.
13.2global::score()
The score function assigns a score to an array of results, based on one or more scoring expressions. The score function may only be used as a pipe function.

*[_type == "listing"] | score(body match "jacuzzi")
In this query, anything where body match "jacuzzi" returns true will be scored higher than other results. Multiple expressions can be used:

*[_type == "listing"] | score(body match "jacuzzi", bedrooms > 2, available && !inContract)
When multiple expressions are provided, the scores are merged into a single score for each result (see score evaluation)

Only predicate expressions — that is, expressions that evaluate to a single boolean value or to null — may be used, including boost(). However, an implementation can put further constraints on which expressions are permitted as a score expression for optimization purposes.

Each score is assigned to the result as the new attribute _score, set to a positive number.

Scoring is additive. That is * | score(a == 1) | score(b == 2) is equivalent to * | score(a == 1, b == 2).

score(base, args, scope)
Let baseNode be the Expression.
Let base be the result of Evaluate(baseNode, scope).
If base is an array:
Let result be an empty Array.
For each element of base:
If element is an object:
Let elementScope be the result of NewNestedScope(element, scope).
Let newElement be a new empty Object.
Add the attributes from element to it.
If element already has a _score:
Let scoreSum be the current value of _score.
Otherwise let scoreSum be 1.0.
For each predicateNode of args:
Let scoreValue be the result of EvaluateScore(predicateNode, elementScope).
Add scoreValue to scoreSum.
Add the attribute _score set to scoreSum.
Add newElement to result.
Otherwise add element to result.
Return result sorted by the score, in descending order.
Return null.
EvaluateScore(expr, scope)
Let evaluator be the score evaluator of expr.
Return the result of evaluator(scope).
score_validate(args)
If the length of args is 0:
Report an error.
14Vendor functions
An implementation is free to introduce additional functions than what is presented in this specification, but this is problematic if a function with the same name is introduced in a future version. The following section defines optional vendor functions which are guaranteed to never be a regular function in a future specification. There’s also a short description of each vendor function so different implementations can attempt to be compatible with each other. The description is intentionally brief and it’s up to the vendor to define it completely.

14.1global::identity()
The identity function should accept zero arguments and return a string which represents the identity of the client executing the query.

14.2global::path()
The path function should accept a single argument and return a path object.

15Extensions
Extensions are the capabilities which extend GROQ queries beyond basic Spec. These capabilities can include function namespaces, functions and operators. However, extensions can not introduce a new syntax.

15.1Portable Text Extension
Functions available in Portable text extension are grouped under pt namespace except for the constructor which is global.

15.1.1pt type
PT type represents an object following portable text spec.

15.1.2global::pt()
This function takes in an object or an array of objects, and returns a PT value.

global_pt(args, scope)
Let baseNode be the first element of args.
Let base be the result of Evaluate(baseNode, scope).
If base is an object:
Try to parse it as Portable Text Block:
If base is a valid Portable Text Block:
Return base.
If base is an array of objects:
Try to parse it as an array of Portable Text blocks:
If all elements in base array are valid Portable Text blocks:
Return base.
Otherwise:
Return null.
global_pt_validate(args)
If the length of args is not 1:
Report an error.
15.1.3pt::text()
This function takes in a PT value and returns a string versions of text. PT value which consists of more than one Portable text block has blocks appended with double newline character (\n\n) in the string version.

pt_text(args, scope)
Let baseNode be the first element of args.
Let base be the result of Evaluate(baseNode, scope).
If base is an object:
Try to parse it as Portable Text Block:
If baseis a valid Portable Text Block:
Return string version of text in base.
If base is an array of objects:
Try to parse it as an array of Portable Text blocks:
If all elements in base array are valid Portable Text blocks:
Return string version of text in base.
Otherwise:
Return null.
pt_text_validate(args)
If the length of args is not 1:
Report an error.
15.2Geography Extension
Functions available in Geography extension are grouped under geo namespace except for the constructor which is global.

15.2.1geo type
The geo type represents a geography and can contain points, lines, and polygons which can be expressed with a single latitude/longitude coordinate, or as a GeoJSON object. Concretely, an object is coerced to the geo type if:

If the object is coerced to a geographic point, that is it has a key lat for latitude and a key lng or lon for longitude (but not both).
If the object has GeoJSON representation.
Geo type supports following GeoJSON Geometry Objects:

Position
Point
MultiPoint
LineString
MultiLineString
Polygon
MultiPolygon
GeometryCollection
And, it does not support:

GeoJSON Object Feature and FeatureCollection.
Arrays of geographic values. Instead, one of the GeoJSON Multi types should be used.
15.2.2global::geo()
This function is a constructor for geographic value. It takes an object or another geo value, returning a geo value.

global_geo(args, scope)
Let baseNode be the first element of args.
Let base be the result of Evaluate(baseNode, scope).
If base is an object:
Try to parse it as Geo Point and GeoJSON:
If base is a valid geo value:
Return base.
If base is a geo value:
Return base.
Otherwise:
Return null.
global_geo_validate(args)
If the length of args is not 1:
Report an error.
15.2.3geo::latLng()
Takes latitude and longitude as arguments and returns a Geo Point.

geo_latLng(args, scope)
Let latNode be the first element of args.
Let lngNode be the second element of args.
Let lat be the result of Evaluate(latNode, scope).
Let lng be the result of Evaluate(lngNode, scope).
If lat or lng is not a number:
Return null.
If lat is not in the range of -90 to 90:
Return null.
If lng is not in the range of -180 to 180:
Return null.
Otherwise:
Return a GeoJSON Point with lat and lng as coordinates, in lng, lat order.
geo_latLng_validate(args)
If the length of args is not 2:
Report an error.
15.2.4geo::contains()
Returns true if first geo argument completely contains the second one, using a planar (non-spherical) coordinate system. Both geo argument can be any geo value. A geo value is considered contained if all its points are within the boundaries of the first geo value. For MultiPolygon, it’s sufficient that only one of the polygons contains the first geo value.

geo_contains(args, scope)
Let firstNode be the first element of args.
Let secondNode be the second element of args.
Let first be the result of Evaluate(firstNode, scope).
Let second be the result of Evaluate(secondNode, scope).
If first or second is a not a geo value:
Return null.
If first completely contains second:
Return true.
Otherwise:
Return false.
geo_contains_validate(args)
If the length of args is not 2:
Report an error.
15.2.5geo::intersects()
This function takes two geo values, and returns true if they intersect in a planar (non-spherical) coordinate system. The arguments can be any geo values. A geo value intersects with another if it shares any geometric points with the second value; for example, a line crossing a polygon.

geo_intersects(args, scope)
Let firstNode be the first element of args.
Let secondNode be the second element of args.
Let first be the result of Evaluate(firstNode, scope).
Let second be the result of Evaluate(secondNode, scope).
If first or second is a not a geo value:
Return null.
If first intersects second:
Return true.
Otherwise:
Return false.
geo_intersects_validate(args)
If the length of args is not 2:
Report an error.
15.2.6geo::distance()
This functions accepts two geo values, which must be point values, and returns the distance in meters. While exact algorithm is implementation-defined — for example, it may use the Haversine formula — it should use as close an approximation to a real Earth distance as possible.

geo_distance(args, scope)
Let firstNode be the first element of args.
Let secondNode be the second element of args.
Let first be the result of Evaluate(firstNode, scope).
Let second be the result of Evaluate(secondNode, scope).
If first or second is a not a geo value:
Return null.
If first or second is a not a Geo Point or GeoJSON Point:
Return null.
Let distance be the geographic distance between first and second:
Return distance.
Otherwise:
Return null.
geo_distance_validate(args)
If the length of args is not 2:
Report an error.
§Index
And
Array
array_compact
array_compact_validate
array_intersects
array_intersects_validate
array_join
array_join_validate
array_unique
array_unique_validate
ArrayElement
ArrayElements
ArrayPostfix
Asc
AttributeAccess
BasicTraversalArray
BasicTraversalPlain
Boolean
boost
boost_validate
Comment
CommentChar
Comparison
ComparisonOperator
CompoundExpression
ConstantEvaluate
dateTime_now
dateTime_now_validate
Decimal
delta_changedAny
delta_changedAny_validate
delta_changedOnly
delta_changedOnly_validate
delta_operation
delta_operation_validate
Dereference
Desc
DetermineName
diff_changedAny
diff_changedAny_validate
diff_changedOnly
diff_changedOnly_validate
Digit
DisambiguateSquareBracketTraversal
DoubleStringCharacter
ElementAccess
Equal
Equality
EqualityOperator
EscapeSequence
Evaluate
EvaluateAnd
EvaluateArray
EvaluateArrayPostfix
EvaluateAttributeAccess
EvaluateComparison
EvaluateDereference
EvaluateElementAccess
EvaluateEquality
EvaluateEverything
EvaluateFilter
EvaluateFuncCall
EvaluateIn
EvaluateMatch
EvaluateMinus
EvaluateNot
EvaluateObject
EvaluateOr
EvaluatePair
EvaluateParameter
EvaluateParent
EvaluateParenthesis
EvaluatePercent
EvaluatePipeFuncCall
EvaluatePlus
EvaluateProjection
EvaluateRange
EvaluateScore
EvaluateSelector
EvaluateSlash
EvaluateSlice
EvaluateStar
EvaluateStarStar
EvaluateThis
EvaluateThisAttribute
EvaluateTraversalExpression
EvaluateTraversalFlatMap
EvaluateTraversalInnerMap
EvaluateTraversalJoin
EvaluateTraversalMap
EvaluateUnaryMinus
EvaluateUnaryPlus
Everything
ExclusiveRange
ExecuteQuery
ExponentMarker
Expression
Filter
Fractional
FuncCall
FuncCallArgs
FuncDecl
FuncIdentifier
FuncNamespace
FuncParams
geo_contains
geo_contains_validate
geo_distance
geo_distance_validate
geo_intersects
geo_intersects_validate
geo_latLng
geo_latLng_validate
global_after
global_after_validate
global_before
global_before_validate
global_coalesce
global_count
global_count_validate
global_dateTime
global_dateTime_validate
global_defined
global_defined_validate
global_geo
global_geo_validate
global_length
global_length_validate
global_lower
global_lower_validate
global_now
global_now_validate
global_pt
global_pt_validate
global_references
global_references_validate
global_round
global_round_validate
global_select
global_select_validate
global_string
global_string_validate
global_upper
global_upper_validate
HasReferenceTo
HexDigit
HexLetter
Identifier
In
InclusiveRange
Integer
Literal
Match
MatchAnalyzePattern
MatchTokenize
math_avg
math_avg_validate
math_max
math_max_validate
math_min
math_min_validate
math_sum
math_sum_validate
Minus
NewNestedScope
NewRootScope
Not
Null
Number
Object
ObjectAttribute
ObjectAttributes
OperatorCall
Or
order
order_validate
Pair
Parameter
Parent
Parenthesis
PartialCompare
Percent
PipeFuncCall
Plus
Projection
pt_text
pt_text_validate
Query
Range
ScientificNotation
score
score_validate
Selector
SelectorGroup
SelectorTuple
SelectorTuplePart
Sign
SimpleExpression
SingleEscapeSequence
SingleStringCharacter
Slash
Slice
SourceCharacter
SquareBracketTraversal
Star
StarStar
String
string_split
string_split_validate
string_startsWith
string_startsWith_validate
This
ThisAttribute
TotalCompare
Traversal
TraversalArray
TraversalArraySource
TraversalArrayTarget
TraversalExpression
TraversalPlain
TypeOrder
UnaryMinus
UnaryPlus
UnicodeEscapeSequence
Validate
ValidateAsc
ValidateDesc
ValidateElementAccess
ValidateFuncCall
ValidateObject
ValidateObjectAttribute
ValidateParameter
ValidatePipeFuncCall
ValidateSlice
WhiteSpace
Written in Spec Markdown.
```
````
