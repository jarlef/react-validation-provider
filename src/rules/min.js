export default (min = 0, hint = 'Too small') => {
  return {
    validate: value => {
      return value >= min;
    },
    hint
  };
};
