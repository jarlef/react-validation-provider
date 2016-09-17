import { scope } from '../../src';

export const customScope = (component) => {
    return scope({ manual: true})(component);
};

