export default (length = 0, hint = () => `Min size is ${length}`) => {
  return {
    validate: value => {
      return value.length >= length;
    },
    hint
  };
};
