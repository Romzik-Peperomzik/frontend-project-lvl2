import * as yaml from 'js-yaml';

const parseFile = (file, type) => {
  switch (type) {
    case '.yml':
    case '.yaml':
      return yaml.load(file);
    default: // .js
      return JSON.parse(file);
  }
};

export default parseFile;
