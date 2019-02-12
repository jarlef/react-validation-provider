import { isString } from '../utils';

export default (pattern, hint = () => `Value is invalid`) => {
  const re = isString(pattern) ? new RegExp(pattern) : pattern;
  return {
    validate: value => {
      return re.test(value);
    },
    hint
  };
};
