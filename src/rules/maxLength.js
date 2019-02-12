export default (length = 1000, message = () => `Max length is ${length}`) => {
  return {
    validate: value => {
      return value.length <= length;
    },
    hint: () => {
      return message;
    }
  };
};
