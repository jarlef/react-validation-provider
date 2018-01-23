export const required = (message = 'Required') => {
    return {
        validate: value => {
            return !!value.trim();
        },
        hint: () => {
            return message;
        }
    };
};
