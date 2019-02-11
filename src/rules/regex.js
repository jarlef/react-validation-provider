import { isString } from "../utils";

export const number = (pattern, message = () => `Value is invalid`) => {
    const re = isString(pattern) ? new RegExp(pattern) : pattern;
    return {
        validate: value => {
            return re.test(value);
        },
        hint: message
    };
};
