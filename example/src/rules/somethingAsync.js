export const somethingAsync = (message = "Not approved") => {
    return {
        validate: value => {
            const promise = new Promise((resolve, reject) => {
                setTimeout(() => resolve(true), 5000);
            });
            
            return promise;
        },
        hint: () => {
            return message;
        }
    };
};
