  export const minimumLength = (length = 0, message = "") => {
    return {
        validate: value => {             
            return !!value.trim() && value.length >= length;
        },
        hint: value => {
            return message || `'${value}' must be greater than ${length} characters`;
        }
    }
};
