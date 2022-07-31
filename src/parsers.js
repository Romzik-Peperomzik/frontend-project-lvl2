import * as yaml from 'js-yaml';

const parseData = (data, type) => {
  switch (type) {
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Unknown data type: '${type}'!`);
  }
};

export default parseData;
