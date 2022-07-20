import _ from 'lodash';

const isSingleString = (val1, val2) => {
  if ((!_.isPlainObject(val1) && !_.isPlainObject(val2))
    || (!_.isPlainObject(val1) && Object.keys(val2).length === 0)
  ) return true;
  return false;
};

const makePreparedNode = (node, val1, val2) => {
  const children = _.isPlainObject(val1) || _.isPlainObject(val2);
  return { node, children };
};

const diff = (obj1 = {}, obj2 = {}) => {
  if (isSingleString(obj1, obj2)) return obj1;

  const totalKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return totalKeys.map((key) => {
    const [val1, val2] = [obj1[key], obj2[key]];
    const preparedNode = makePreparedNode(key, val1, val2);
    if (Object.keys(obj2).length === 0 || Object.keys(obj1).length === 0) {
      return { ...preparedNode, status: 'unchanged', value: diff(val1 || val2) };
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (val1 === val2) return { ...preparedNode, status: 'unchanged', value: val1 };
      if (_.isPlainObject(val1) && _.isPlainObject(val2)) {
        return { ...preparedNode, status: 'unchanged', value: diff(val1, val2 || {}) };
      }
      return {
        ...preparedNode, status: 'updated', value: diff(val1), newValue: diff(val2),
      };
    }
    return _.has(obj1, key)
      ? { ...preparedNode, status: 'removed', value: diff(val1) }
      : { ...preparedNode, status: 'added', value: diff(val2) };
  });
};

export default diff;
