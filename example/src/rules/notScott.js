export const notScott = (message = 'You cannot be scott') => {
    return {
        validate: value => {
            return value.toLowerCase() !== "scott";
        },
        hint: () => {
            return message;
        }
    };
};
