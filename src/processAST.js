import _ from 'lodash';

const isSoloValue = (val1, val2) => {
  if ((!_.isPlainObject(val1) && !_.isPlainObject(val2))
    || (!_.isPlainObject(val1) && Object.keys(val2).length === 0)
  ) return true;
  return false;
};

const makeAST = (obj1 = {}, obj2 = {}) => {
  if (isSoloValue(obj1, obj2)) return obj1;

  const totalKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return totalKeys.map((key) => {
    const [val1, val2] = [obj1[key], obj2[key]];
    if ((_.has(obj1, key) && _.has(obj2, key))
      || Object.keys(obj2).length === 0
    ) {
      if ((val1 === val2)
        || (_.isPlainObject(val1) && _.isPlainObject(val2))
        || (Object.keys(obj2).length === 0)
      ) {
        return _.isPlainObject(val1) && _.isPlainObject(val2)
          ? { node: key, status: 'unchanged', children: makeAST(val1, val2) }
          : { node: key, status: 'unchanged', value: val1 };
      }
      return {
        node: key, status: 'updated', value: val1, value1: val2,
      };
    }
    return _.has(obj1, key)
      ? { node: key, status: 'removed', value: val1 }
      : { node: key, status: 'added', value: val2 };
  });
};

export default makeAST;
