const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const email = () => {
    return {
        validate: value => {
            return emailRegexp.test(value);
        },
        hint: value => {
            return `'${value}' is not a valid email`;
        }
    }
};
