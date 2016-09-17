import { scope } from '../../src';

export const manualScope = (component) => {
    return scope(component, { manual: true});
};

export const autoScope = (component) => {
    return scope(component, { manual: false});
};

