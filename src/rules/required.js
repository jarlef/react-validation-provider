export default (hint = () => 'Required') => {
  return {
    handlesNull: true,
    validate: value => {
      return value != null && !!value.trim();
    },
    hint
  };
};
