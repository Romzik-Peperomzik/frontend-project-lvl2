import * as yaml from 'js-yaml';

const parseData = (file, type) => {
  switch (type) {
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    case 'json':
      return JSON.parse(file);
    default:
      throw new Error(`Unknown file type: '${type}'!`);
  }
};

export default parseData;
