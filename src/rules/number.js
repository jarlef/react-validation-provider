/* eslint-disable no-restricted-globals */
export default (hint = value => `${value} is not a valid number`) => {
  return {
    validate: value => {
      return !isNaN(parseFloat(value)) && isFinite(value);
    },
    hint
  };
};
