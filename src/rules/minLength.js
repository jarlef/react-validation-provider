
export const minLength = (length = 0, message = () => `Min size is ${length}`) => {
    return {
        validate: value => {
            return value.length >= length
        },
        hint: message
    };
};
