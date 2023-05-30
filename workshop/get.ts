const query = { response: { body: { data: { message: "hello", list: ["not me", "world"] } } } };
{
  const get = (obj: any, path: string | (string | number)[], defValue: any) => {
    if (!path) return undefined;
    const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g) || [];
    const result = [...pathArray].reduce((prevObj: any, key: any) => prevObj && prevObj[key], obj);
    return result === undefined ? defValue : result;
  }

  console.log(get(query, 'response.body.data.message', 'pwet'));
  console.log(get(query, ['response', 'body', 'data', 'list', 1], 'pwet'));
};

{
  const get = (obj: any) => (path: string | (string | number)[]) => (defValue: any) => {
    if (!path) return undefined;
    const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g) || [];
    const result = [...pathArray].reduce((prevObj: any, key: any) => prevObj && prevObj[key], obj);
    return result === undefined ? defValue : result;
  }

  console.log(get(query)('response.body.data.message')('pwet'));
  console.log(get(query)(['response', 'body', 'data', 'list', 1])('pwet'));
}

{
  const pipe = <ValueType>(...fns: CallableFunction[]) => (value: ValueType) => fns.reduce((current, callable) => callable(current), value);
  const getOr = (defValue: any) => (path: string | (string | number)[]) => (obj: any) => {
    if (!path) return undefined;
    const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g) || [];
    const result = [...pathArray].reduce((prevObj: any, key: any) => prevObj && prevObj[key], obj);
    return result === undefined ? defValue : result;
  }
  const getData = getOr({})('response.body.data');
  const getMessage = pipe(getData, getOr('pwet')('message'));
  console.log(getMessage(query));
}
