# The get function

## What is optional chaining ?

Given an object, a path and a default value, make a get function that will return the value at path of object.
If the given path is undefined it returns undefined.
If the resolved value is undefined, the defaultValue is returned in its place.

```js
const query = { response: { body: { data: { message: "hello", list: ["not me", "world"] } } } };
get(query, 'response.body.data.message', 'pwet') // hello;
get(query, ['response', 'body', 'data', 'list', 1], 'prout') // world;
```

tips: the regexp /([^[.\]])+/g should be helpful

## Add some spice

Curry the get function to be usable when called like this:

```js
get(query)('response.body.data.message')('Vurp!') // hello;
```

## Flipping functions

Flip the function arguments and make a message and a list getter, pipe usage is recommended:

```js
getOr('Gulp!')('response.body.data.message')(query);
getData(query); // {data: {message: "hello", list: ["not me", "world"]}}
getMessage(query); // hello
```

```js
const pipe = <ValueType>(...fns: CallableFunction[]) => (value: ValueType) => 
  fns.reduce((current, callable) => callable(current), value);
```
