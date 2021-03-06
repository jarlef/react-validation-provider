export default (max = 0, hint = 'Too large') => {
  return {
    validate: value => {
      return value <= max;
    },
    hint
  };
};
