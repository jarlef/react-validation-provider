
export const number = (message = (value) => `${value} is not a valid number`) => {
    return {
        validate: value => {
            return !isNaN(parseFloat(value)) && isFinite(value);
        },
        hint: message
    };
};
