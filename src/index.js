import processDiffFiles from './processDiff.js';

const genDiff = (fp1, fp2, formatType) => processDiffFiles(fp1, fp2, formatType);

export default genDiff;
