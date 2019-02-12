
const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const email = (hint = () => `Not a valid email`) => {
    return {
        validate: value => {
            return re.test(value);
        },
        hint: hint
    };
};
