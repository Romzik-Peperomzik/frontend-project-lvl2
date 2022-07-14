import _ from 'lodash';

const diff = (obj1, obj2) => {
  if ((!_.isPlainObject(obj1) && !_.isPlainObject(obj2))
    || (!_.isPlainObject(obj1) && Object.keys(obj2).length === 0)
  ) return obj1;
  const totalKeys = _.sortedUniq([...Object.keys(obj1), ...Object.keys(obj2)].sort());

  return totalKeys.map((key) => {
    if (Object.keys(obj2).length === 0 || Object.keys(obj1).length === 0) {
      return { status: 'unchanged', node: key, value: diff(obj1[key] || obj2[key], {}) };
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if ((obj1[key] === obj2[key])
        || (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key]))
      ) {
        return { status: 'unchanged', node: key, value: diff(obj1[key], obj2[key] || {}) };
      }
      return [
        { status: 'removed', node: key, value: diff(obj1[key], {}) },
        { status: 'added', node: key, value: diff(obj2[key], {}) },
      ];
    }
    return _.has(obj1, key)
      ? { status: 'removed', node: key, value: diff(obj1[key], {}) }
      : { status: 'added', node: key, value: diff(obj2[key], {}) };
  }).flat();
};

export default diff;
