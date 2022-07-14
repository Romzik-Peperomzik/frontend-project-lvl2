import _ from 'lodash';

const diff = (file1, file2) => {
  const iter = (obj1, obj2) => {
    const totalKeys = _.sortedUniq([...Object.keys(obj1), ...Object.keys(obj2)].sort());

    return totalKeys.map((key) => {
      if (Object.keys(obj2).length === 0) {
        if (_.isPlainObject(obj1[key])) {
          return { status: 'unchanged', node: key, value: iter(obj1[key], {}) };
        }
        return { status: 'unchanged', node: key, value: obj1[key] };
      }

      if (Object.keys(obj1).length === 0) {
        if (_.isPlainObject(obj2[key])) {
          return { status: 'unchanged', node: key, value: iter(obj2[key], {}) };
        }
        return { status: 'unchanged', node: key, value: obj2[key] };
      }

      if (_.has(obj1, key) && _.has(obj2, key)) {
        if ((obj1[key] === obj2[key])) {
          return { status: 'unchanged', node: key, value: obj1[key] };
        }
        if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
          return { status: 'unchanged', node: key, value: iter(obj1[key], obj2[key]) };
        }
        if (_.isPlainObject(obj1[key])) {
          return [
            { status: 'removed', node: key, value: iter(obj1[key], {}) },
            { status: 'added', node: key, value: obj2[key] },
          ];
        }
        if (_.isPlainObject(obj2[key])) {
          return [
            { status: 'removed', node: key, value: obj1[key] },
            { status: 'added', node: key, value: iter(obj2[key], {}) },
          ];
        }
        return [
          { status: 'removed', node: key, value: obj1[key] },
          { status: 'added', node: key, value: obj2[key] },
        ];
      }
      if (_.has(obj1, key)) {
        if (_.isPlainObject(obj1[key])) {
          return { status: 'removed', node: key, value: iter(obj1[key], {}) };
        }
        return { status: 'removed', node: key, value: obj1[key] };
      }
      if (_.isPlainObject(obj2[key])) {
        return { status: 'added', node: key, value: iter(obj2[key], {}) };
      }
      return { status: 'added', node: key, value: obj2[key] };
    }).flat();
  };
  return iter(file1, file2);
};

export default diff;
