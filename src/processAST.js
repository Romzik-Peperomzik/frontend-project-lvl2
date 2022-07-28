import _ from 'lodash';

const makeAST = (obj1, obj2) => {
  const totalKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return totalKeys.map((key) => {
    const [val1, val2] = [obj1[key], obj2[key]];
    switch (true) {
      case !_.has(obj1, key):
        return { node: key, status: 'added', value: val2 };
      case !_.has(obj2, key):
        return { node: key, status: 'removed', value: val1 };
      case _.isPlainObject(val1) && _.isPlainObject(val2):
        return { node: key, status: 'nested', children: makeAST(val1, val2) };
      case (val1 !== val2):
        return {
          node: key, status: 'updated', value: val1, value1: val2,
        };
      default:
        return { node: key, status: 'unchanged', value: val1 };
    }
  });
};

export default makeAST;
