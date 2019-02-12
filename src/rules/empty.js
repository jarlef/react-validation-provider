export default (hint = 'Is not empty') => {
  return {
    handlesNull: true,
    validate: value => {
      return value == null || value.length === 0 || !value.trim();
    },
    hint
  };
};
