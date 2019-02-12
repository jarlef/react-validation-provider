const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export default (hint = () => `Not a valid email`) => {
  return {
    validate: value => {
      return re.test(value);
    },
    hint
  };
};
