
export const required = (message = () => 'Required') => {
    return {
        handlesNull: true,
        validate: value => {
            return value != null && !!value.trim();
        },
        hint: message
    };
};
