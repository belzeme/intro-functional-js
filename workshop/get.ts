type pathArg = string | (string | number)[];
const query = { response: { body: { data: { message: "hello", list: ["not me", "world"] } } } };

{
  // What is optional chaining
  const get = (obj: any, path: pathArg, defValue: any) => {
    if (!path) return undefined;
    const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g) || [];
    const result = [...pathArray].reduce((prevObj: any, key: any) => prevObj && prevObj[key], obj);
    return result === undefined ? defValue : result;
  }

  console.log(get(query, 'response.body.data.message', 'pwet'));
  console.log(get(query, ['response', 'body', 'data', 'list', 1], 'pwet'));
};

{
  // Add some spice
  const get = (obj: any) => (path: pathArg) => (defValue: any) => {
    if (!path) return undefined;
    const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g) || [];
    const result = [...pathArray].reduce((prevObj: any, key: any) => prevObj && prevObj[key], obj);
    return result === undefined ? defValue : result;
  }

  console.log(get(query)('response.body.data.message')('pwet'));
  console.log(get(query)(['response', 'body', 'data', 'list', 1])('pwet'));
}

{
  // Flipping functions
  const pipe = <ValueType>(...fns: CallableFunction[]) => (value: ValueType) => fns.reduce((current, callable) => callable(current), value);
  const getOr = (defValue: any) => (path: pathArg) => (obj: any) => {
    if (!path) return undefined;
    const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g) || [];
    const result = [...pathArray].reduce((prevObj: any, key: any) => prevObj && prevObj[key], obj);
    return result === undefined ? defValue : result;
  }
  const getData = getOr({})('response.body.data');
  const getMessage = pipe(getData, getOr('pwet')('message'));
  console.log(getMessage(query));
}
